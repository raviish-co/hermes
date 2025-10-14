import { PrismaClient } from "~/lib/backend/persistence/postgres/generated/prisma";

const prismaClient = new PrismaClient({ datasourceUrl: useRuntimeConfig().databaseUrl });

export const usePrismaClient = () => prismaClient;
