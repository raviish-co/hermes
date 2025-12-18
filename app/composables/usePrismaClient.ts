import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: useRuntimeConfig().databaseUrl });
const prismaClient = new PrismaClient({ adapter });

export const usePrismaClient = () => prismaClient;
