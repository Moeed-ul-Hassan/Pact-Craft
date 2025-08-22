import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, FileText, Mail, Plus, Download } from "lucide-react";
import { downloadPDF, downloadWord } from "@/lib/documentGenerator";
import { useToast } from "@/hooks/use-toast";

interface DownloadSectionProps {
  contract: string;
  contractId: string;
  onCreateNew: () => void;
}

export default function DownloadSection({ contract, contractId, onCreateNew }: DownloadSectionProps) {
  const [emailAddress, setEmailAddress] = useState("");
  const [isEmailSending, setIsEmailSending] = useState(false);
  const { toast } = useToast();

  const handleDownloadPDF = async () => {
    try {
      await downloadPDF(contract, contractId);
      
      // Track download
      await fetch(`/api/contracts/${contractId}/download`, {
        method: 'POST',
      });
      
      toast({
        title: "Success",
        description: "PDF downloaded successfully",
      });
    } catch (error) {
      console.error('PDF download error:', error);
      toast({
        title: "Error",
        description: "Failed to download PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadWord = async () => {
    try {
      await downloadWord(contract, contractId);
      
      // Track download
      await fetch(`/api/contracts/${contractId}/download`, {
        method: 'POST',
      });
      
      toast({
        title: "Success",
        description: "Word document downloaded successfully",
      });
    } catch (error) {
      console.error('Word download error:', error);
      toast({
        title: "Error",
        description: "Failed to download Word document. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEmailContract = async () => {
    if (!emailAddress.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsEmailSending(true);
    try {
      const response = await fetch(`/api/contracts/${contractId}/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailAddress }),
      });

      if (!response.ok) {
        throw new Error('Email sending failed');
      }

      toast({
        title: "Success",
        description: `Contract sent to ${emailAddress}`,
      });
      setEmailAddress("");
    } catch (error) {
      console.error('Email sending error:', error);
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEmailSending(false);
    }
  };

  return (
    <motion.div 
      data-testid="download-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
          >
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-2xl font-semibold text-foreground mb-2" data-testid="success-title">
            Contract Generated Successfully
          </h3>
          <p className="text-muted-foreground" data-testid="success-description">
            Your contract is ready for download in multiple formats
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleDownloadPDF}
              className="w-full bg-red-600 text-white hover:bg-red-700"
              data-testid="button-download-pdf"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </motion.div>
          <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleDownloadWord}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              data-testid="button-download-word"
            >
              <FileText className="h-4 w-4 mr-2" />
              Download Word
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="border-t border-border pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h4 className="font-medium text-foreground mb-4" data-testid="email-section-title">Email Contract</h4>
          <div className="flex gap-2 max-w-md mx-auto">
            <motion.div 
              className="flex-1"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Input
                type="email"
                placeholder="Enter email address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="w-full"
                data-testid="input-email"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleEmailContract}
                disabled={isEmailSending}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="button-email-contract"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            onClick={onCreateNew}
            className="mt-6"
            data-testid="button-create-new"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Another Contract
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
