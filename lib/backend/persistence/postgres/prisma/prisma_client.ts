import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({ datasourceUrl: process.env.NUXT_DATABASE_URL });

export { prismaClient };
