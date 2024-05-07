import { describe, expect, it } from "vitest";
import { ItemStockRepositoryStub } from "../stubs/item_stock_repository_stub";
import { WarehouseService } from "../../application/warehouse_service";

describe("WharehouseService - Artigos em Stock", async () => {
    it("Deve recuperar os artigos em stock", async () => {
        const itemStockRepositoy = new ItemStockRepositoryStub();
        const service = new WarehouseService(itemStockRepositoy);

        const itemsStock = await service.listItemStock();

        expect(itemsStock.length).toEqual(12);
    });

    it("Deve retornar um lista vazia quando não houver artigos em stock", async () => {
        const service = new WarehouseService(itemStockRepositoyMock);

        const itemsStock = await service.listItemStock();

        expect(itemsStock.length).toEqual(0);
    });
});

const itemStockRepositoyMock = {
    getAll: async () => [],
    save: async () => {},
    updateAll: async () => {},
    findAll: async () => [],
    findAllInStock: async () => [],
    findAllOutOfStock: async () => [],
};
