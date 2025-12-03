import { PostgresItemRepository } from "@backend/persistence/postgres/postgres_item_repository";
import { ItemRepositoryStub } from "@backend/tests/stubs/item_repository_stub";
import { usePrismaClient } from "./usePrismaClient";

const repository =
    process.env.NODE_ENV === "development"
        ? new ItemRepositoryStub()
        : new PostgresItemRepository(usePrismaClient());

export const useItemRepository = () => repository;
