import { PrismaClient } from '@prisma/client';

declare global {
  // Declaring a global prisma instance to avoid creating multiple instances in development
  var prisma: PrismaClient | undefined;
}

const prisma =
  process.env.NODE_ENV === 'production'
    ? new PrismaClient()
    : global.prisma || new PrismaClient();

// Assign the PrismaClient instance to `global.prisma` if in development
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
