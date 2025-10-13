import { PrismaClient } from "~/generated/prisma";

const prismaClient = new PrismaClient({ datasourceUrl: useRuntimeConfig().databaseUrl });

export const usePrismaClient = () => prismaClient;
