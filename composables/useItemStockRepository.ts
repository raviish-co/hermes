import { PostgresItemStockRepository } from "~/lib/backend/persistense/postgres/postgres_item_stock_repository";
import { ItemStockRepositoryStub } from "~/lib/backend/tests/stubs/item_stock_repository_stub";
import { usePrismaClient } from "./usePrismaClient";

// const repository =
//     process.env.NODE_ENV === "development"
//         ? new ItemStockRepositoryStub()
//         : new PostgresItemStockRepository(usePrismaClient());

export const useItemStockRepository = () => new PostgresItemStockRepository(usePrismaClient());
