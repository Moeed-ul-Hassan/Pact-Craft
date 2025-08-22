import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contractFormSchema } from "@shared/schema";
import { generateContract } from "./services/contractGenerator";
import { checkGrammar } from "./services/grammarChecker.js";
import { sendEmail } from "./services/email.js";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Generate contract
  app.post("/api/contracts/generate", async (req, res) => {
    try {
      const validation = contractFormSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: validation.error.issues 
        });
      }

      const { contractType, formData } = validation.data;
      
      // Generate contract content
      const generatedContent = generateContract(contractType, formData);
      
      // Save contract to storage
      const contract = await storage.createContract({
        contractType,
        contractData: formData,
        generatedContent,
      });

      res.json({ contractId: contract.id, content: generatedContent });
    } catch (error) {
      console.error("Contract generation error:", error);
      res.status(500).json({ message: "Failed to generate contract" });
    }
  });

  // Get contract by ID
  app.get("/api/contracts/:id", async (req, res) => {
    try {
      const contract = await storage.getContract(req.params.id);
      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }
      res.json(contract);
    } catch (error) {
      console.error("Get contract error:", error);
      res.status(500).json({ message: "Failed to retrieve contract" });
    }
  });

  // Download contract (increment download count)
  app.post("/api/contracts/:id/download", async (req, res) => {
    try {
      const contract = await storage.getContract(req.params.id);
      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }
      
      await storage.incrementDownloadCount(req.params.id);
      res.json({ message: "Download recorded" });
    } catch (error) {
      console.error("Download tracking error:", error);
      res.status(500).json({ message: "Failed to track download" });
    }
  });

  // Email contract
  app.post("/api/contracts/:id/email", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email address is required" });
      }

      const contract = await storage.getContract(req.params.id);
      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }

      const apiKey = process.env.SENDGRID_API_KEY || process.env.SENDGRID_API_KEY_ENV_VAR || "";
      
      const emailSent = await sendEmail(apiKey, {
        to: email,
        from: process.env.FROM_EMAIL || "noreply@contractgen.com",
        subject: `Your ${contract.contractType.toUpperCase()} Contract`,
        text: contract.generatedContent || "",
        html: `<pre style="font-family: monospace; white-space: pre-wrap;">${contract.generatedContent}</pre>`,
      });

      if (emailSent) {
        res.json({ message: "Contract sent successfully" });
      } else {
        res.status(500).json({ message: "Failed to send email" });
      }
    } catch (error) {
      console.error("Email sending error:", error);
      res.status(500).json({ message: "Failed to send contract email" });
    }
  });

  // Grammar check endpoint
  app.post("/api/grammar-check", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ message: "Text is required" });
      }

      const suggestions = await checkGrammar(text);
      res.json({ suggestions });
    } catch (error) {
      console.error("Grammar check error:", error);
      res.status(500).json({ message: "Grammar check failed", suggestions: [] });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
