import { type User, type InsertUser, type Contract, type InsertContract } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContract(contract: InsertContract): Promise<Contract>;
  getContract(id: string): Promise<Contract | undefined>;
  getContractsByUserId(userId: string): Promise<Contract[]>;
  updateContract(id: string, updates: Partial<Contract>): Promise<Contract | undefined>;
  incrementDownloadCount(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contracts: Map<string, Contract>;

  constructor() {
    this.users = new Map();
    this.contracts = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContract(insertContract: InsertContract): Promise<Contract> {
    const id = randomUUID();
    const contract: Contract = {
      ...insertContract,
      id,
      userId: null,
      createdAt: new Date(),
      downloadCount: 0,
      generatedContent: insertContract.generatedContent || null,
    };
    this.contracts.set(id, contract);
    return contract;
  }

  async getContract(id: string): Promise<Contract | undefined> {
    return this.contracts.get(id);
  }

  async getContractsByUserId(userId: string): Promise<Contract[]> {
    return Array.from(this.contracts.values()).filter(
      (contract) => contract.userId === userId,
    );
  }

  async updateContract(id: string, updates: Partial<Contract>): Promise<Contract | undefined> {
    const existing = this.contracts.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.contracts.set(id, updated);
    return updated;
  }

  async incrementDownloadCount(id: string): Promise<void> {
    const contract = this.contracts.get(id);
    if (contract) {
      contract.downloadCount = (contract.downloadCount || 0) + 1;
      this.contracts.set(id, contract);
    }
  }
}

export const storage = new MemStorage();
