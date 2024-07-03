import { describe, expect, it } from "vitest";
import { WarehouseService } from "../../application/warehouse_service";
import { ItemStockRepositoryStub } from "../stubs/item_stock_repository_stub";

describe("WharehouseService - Artigos em Stock", async () => {
    it("Deve recuperar os artigos em stock", async () => {
        const itemStockRepositoy = new ItemStockRepositoryStub();
        const service = new WarehouseService(itemStockRepositoy);

        const itemsStock = await service.listItemStock();

        expect(itemsStock.length).toEqual(12);
    });
});
