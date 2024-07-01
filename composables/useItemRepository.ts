import { InmemItemRepository } from "~/lib/backend/persistense/inmem/inmem_item_repository";
import { PostgresItemRepository } from "~/lib/backend/persistense/postgres/postgres_item_repository";
import { usePrismaClient } from "./usePrismaClient";

const repository =
    process.env.NODE_ENV === "development"
        ? new InmemItemRepository()
        : new PostgresItemRepository(usePrismaClient());

export const useItemRepository = () => repository;
