import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contracts = pgTable("contracts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  contractType: text("contract_type").notNull(),
  contractData: json("contract_data").notNull(),
  generatedContent: text("generated_content"),
  createdAt: timestamp("created_at").defaultNow(),
  downloadCount: integer("download_count").default(0),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContractSchema = createInsertSchema(contracts).pick({
  contractType: true,
  contractData: true,
  generatedContent: true,
});

export const contractFormSchema = z.object({
  contractType: z.string().min(1, "Contract type is required"),
  formData: z.record(z.string(), z.any()),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContract = z.infer<typeof insertContractSchema>;
export type Contract = typeof contracts.$inferSelect;
export type ContractForm = z.infer<typeof contractFormSchema>;
