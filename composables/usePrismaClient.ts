import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({ datasourceUrl: useRuntimeConfig().databaseUrl });

export const usePrismaClient = () => prismaClient;
