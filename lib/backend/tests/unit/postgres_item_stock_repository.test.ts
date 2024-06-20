import { describe, expect, it, vi } from "vitest";
import { PostgresItemStockRepository } from "../../persistense/postgres/postgres_item_stock_repository";
import type { PrismaClient } from "@prisma/client";
import { ID } from "../../shared/id";

describe("PostgresItemStockRepository-getAll", () => {
    it("Deve encontrar os artigos em stock", async () => {
        const spy = vi.spyOn(prisma.stock, "findMany");
        const stockRepo = new PostgresItemStockRepository(prisma);

        await stockRepo.getAll();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve recuperar os artigos em stock", async () => {
        const stockRepo = new PostgresItemStockRepository(prisma);

        const itemsStock = await stockRepo.getAll();

        expect(itemsStock.length).toBe(1);
        expect(itemsStock[0].itemStockId.equals(ID.fromString("1"))).toBeTruthy();
        expect(itemsStock[0].total).toBe(10);
    });
});

const prisma = {
    stock: { findMany: async (_args: object) => _itemsStock },
} as unknown as PrismaClient;

const _itemsStock = [
    {
        stockId: "1",
        itemId: "1",
        goodQuantities: 10,
        badQuantities: 0,
    },
];
