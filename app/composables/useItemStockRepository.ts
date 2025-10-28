import { PostgresItemStockRepository } from "@backend/persistence/postgres/postgres_item_stock_repository";
import { ItemStockRepositoryStub } from "@backend/tests/stubs/item_stock_repository_stub";
import { usePrismaClient } from "./usePrismaClient";

const repository =
    process.env.NODE_ENV === "development"
        ? new ItemStockRepositoryStub()
        : new PostgresItemStockRepository(usePrismaClient());

export const useItemStockRepository = () => repository;
