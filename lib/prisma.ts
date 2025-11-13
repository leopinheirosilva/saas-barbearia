// lib/prisma.ts
import { PrismaClient } from "../app/generated/prisma/client"; // Import PrismaClient from Prisma package

const globalForPrisma = global as unknown as { prisma: PrismaClient }; // Extend global object to hold PrismaClient instance

export const prisma = globalForPrisma.prisma || new PrismaClient(); // Use existing instance or create a new one

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; // Assign instance to global object in development mode
