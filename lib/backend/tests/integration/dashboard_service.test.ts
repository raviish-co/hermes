import { describe, expect, it } from "vitest";
import { GoodsIssueNoteRepositoryStub } from "../stubs/goods_issue_note_repository_stub";
import { InmemGoodsIssueNoteRepository } from "../../persistense/inmem/inmem_goods_issue_note_repository";
import { DashboardService } from "../../application/dashboard_service";
import { ItemStockRepositoryStub } from "../stubs/item_stock_repository_stub";
import { ItemStock } from "../../domain/warehouse/item_stock";
import { ID } from "../../shared/id";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import { InmemItemRepository } from "../../persistense/inmem/inmem_item_repository";

describe("Dashboard Service - Total de guias de saída vencidas", async () => {
    it("Deve retornar 0 se não houver guias de saída vencidas", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();
        const itemStockRepository = new ItemStockRepositoryStub();

        const itemRepository = new ItemRepositoryStub();

        const service = new DashboardService(
            goodsIssueRepository,
            itemRepository,
            itemStockRepository
        );

        const result = await service.totalExpiredGoodsIssueNotes();

        expect(result).toBe(0);
    });

    it("Deve retornar o total de guias de saída vencida", async () => {
        const goodsIssueRepository = new GoodsIssueNoteRepositoryStub();
        const itemStockRepository = new ItemStockRepositoryStub();

        const itemRepository = new ItemRepositoryStub();

        const service = new DashboardService(
            goodsIssueRepository,
            itemRepository,
            itemStockRepository
        );

        const result = await service.totalExpiredGoodsIssueNotes();

        expect(result).toBeGreaterThanOrEqual(1);
    });
});

describe("DashboardService - Artigos com estoque esgotado", async () => {
    it("Deve retornar 0 se não houver artigos com estoque esgotado", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();
        const itemRepository = new ItemRepositoryStub();

        const service = new DashboardService(
            goodsIssueRepository,
            itemRepository,
            itemStockRepositoryMock
        );

        const result = await service.totalOutOfStockItems();

        expect(result).toBe(0);
    });

    it("Deve retornar o total de artigos com estoque esgotado", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();
        const itemStockRepository = new ItemStockRepositoryStub();

        items.forEach((item) => itemStockRepository.save(item));

        const itemRepository = new ItemRepositoryStub();

        const service = new DashboardService(
            goodsIssueRepository,
            itemRepository,
            itemStockRepository
        );

        const result = await service.totalOutOfStockItems();

        expect(result).toBe(3);
    });
});

describe("DashboardService - Artigos em armazem", async () => {
    it("Deve retornar 0 se não houver artigos em armazem", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();
        const itemRepository = new ItemRepositoryStub();

        const service = new DashboardService(
            goodsIssueRepository,
            itemRepository,
            itemStockRepositoryMock
        );

        const result = await service.totalInStockItems();

        expect(result).toBe(0);
    });

    it("Deve retornar o total de artigos em armazem", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();
        const itemStockRepository = new ItemStockRepositoryStub();
        const itemRepository = new ItemRepositoryStub();

        const service = new DashboardService(
            goodsIssueRepository,
            itemRepository,
            itemStockRepository
        );

        const result = await service.totalInStockItems();

        expect(result).toBeGreaterThanOrEqual(75);
    });
});

describe("DashboardService -  Valor de mercadorias em stock", () => {
    it("Deve retornar 0 se não houver mercadorias em stock", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();
        const itemStockRepository = new ItemStockRepositoryStub();
        const itemRepository = new InmemItemRepository();

        const service = new DashboardService(
            goodsIssueRepository,
            itemRepository,
            itemStockRepository
        );

        const result = await service.totalInventoryValue();

        expect(result.value).toBe(0);
    });

    it("Deve retornar o valor total das mercadorias em stock", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();
        const itemStockRepository = new ItemStockRepositoryStub();
        const itemRepository = new ItemRepositoryStub();

        const service = new DashboardService(
            goodsIssueRepository,
            itemRepository,
            itemStockRepository
        );

        const result = await service.totalInventoryValue();

        expect(result.value).toBeGreaterThanOrEqual(367500);
    });
});

describe("DashboardService - Percentagem do estado das mercadorias em stock", async () => {
    it("Deve retornar 0 se não exister mercadorias em bom estado em stock", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();
        const itemRepository = new InmemItemRepository();
        const service = new DashboardService(
            goodsIssueRepository,
            itemRepository,
            itemStockRepositoryMock
        );

        const result = await service.percentageOfItemsInStock();

        expect(result.goodPercentage).toBe(0);
    });

    it("Deve retornar a percentagem de mercadorias em bom estado em stock", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();
        const itemRepository = new ItemRepositoryStub();
        const itemStockRepository = new ItemStockRepositoryStub();
        items.forEach((item) => itemStockRepository.save(item));

        const service = new DashboardService(
            goodsIssueRepository,
            itemRepository,
            itemStockRepository
        );

        const result = await service.percentageOfItemsInStock();

        expect(result.goodPercentage).toBeDefined();
        expect(result.goodPercentage).toBeGreaterThanOrEqual(0);
    });

    it("Deve retornar 0 se não exister mercadorias em mau estado em stock", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();
        const itemRepository = new InmemItemRepository();
        const service = new DashboardService(
            goodsIssueRepository,
            itemRepository,
            itemStockRepositoryMock
        );

        const result = await service.percentageOfItemsInStock();

        expect(result.badPercentage).toBe(0);
    });

    it("Deve retornar a percentagem de mercadorias em mau estado em stock", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();
        const itemRepository = new ItemRepositoryStub();
        const itemStockRepository = new ItemStockRepositoryStub();
        items.forEach((item) => itemStockRepository.save(item));

        const service = new DashboardService(
            goodsIssueRepository,
            itemRepository,
            itemStockRepository
        );

        const result = await service.percentageOfItemsInStock();

        expect(result.badPercentage).toBeDefined();
        expect(result.badPercentage).greaterThanOrEqual(0);
    });
});

const itemStockRepositoryMock = {
    getAll: async () => [],
    findAllOutOfStock: async () => [],
    findAllInStock: async () => [],
    save: async (itemStock: ItemStock) => undefined,
    updateAll: async (itemStocks: ItemStock[]) => undefined,
    findAll: async (itemIds: ID[]) => [],
};

const items = [
    new ItemStock(ID.random(), 0, 0),
    new ItemStock(ID.random(), 0, 0),
    new ItemStock(ID.random(), 0, 0),
    new ItemStock(ID.random(), 8, 2),
    new ItemStock(ID.random(), 10, 10),
    new ItemStock(ID.random(), 10, 5),
];
