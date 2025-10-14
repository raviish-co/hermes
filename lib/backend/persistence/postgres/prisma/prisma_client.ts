import { PrismaClient } from "~/lib/backend/persistence/postgres/generated/prisma";

const prismaClient = new PrismaClient({ datasourceUrl: process.env.NUXT_DATABASE_URL });

export { prismaClient };
