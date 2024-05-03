import { describe, expect, it } from "vitest";
import { GoodsIssueRepositoryStub } from "../stubs/goods_issue_repository_stub";
import { InmemGoodsIssueNoteRepository } from "../../persistense/inmem/inmem_goods_issue_note_repository";
import { DashboardService } from "../../application/dashboard_service";
import { ItemStockRepositoryStub } from "../stubs/item_stock_repository_stub";

describe("Dashboard Service - Total de guias de saída vencidas", async () => {
    it("Deve retornar 0 se não houver guias de saída vencidas", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();
        const itemStockRepository = new ItemStockRepositoryStub();

        const service = new DashboardService(goodsIssueRepository, itemStockRepository);

        const result = await service.totalExpiredGoodsIssueNotes();

        expect(result).toBe(0);
    });

    it("Deve retornar o total de guias de saída vencida", async () => {
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const itemStockRepository = new ItemStockRepositoryStub();

        const service = new DashboardService(goodsIssueRepository, itemStockRepository);

        const result = await service.totalExpiredGoodsIssueNotes();

        expect(result).toBeGreaterThanOrEqual(1);
    });
});

describe("DashboardService - Artigos com estoque esgotado", async () => {
    it("Deve retornar 0 se não houver artigos com estoque esgotado", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();

        const service = new DashboardService(goodsIssueRepository, itemStockRepositoryMock);

        const result = await service.totalOutOfStockItems();

        expect(result).toBe(0);
    });

    it("Deve retornar o total de artigos com estoque esgotado", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();
        const itemStockRepository = new ItemStockRepositoryStub();

        const service = new DashboardService(goodsIssueRepository, itemStockRepository);

        const result = await service.totalOutOfStockItems();

        expect(result).toBe(3);
    });
});

describe("DashboardService - Artigos em armazem", async () => {
    it("Deve retornar 0 se não houver artigos em armazem", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();

        const service = new DashboardService(goodsIssueRepository, itemStockRepositoryMock);

        const result = await service.totalInStockItems();

        expect(result).toBe(0);
    });

    it("Deve retornar o total de artigos em armazem", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();
        const itemStockRepository = new ItemStockRepositoryStub();

        const service = new DashboardService(goodsIssueRepository, itemStockRepository);

        const result = await service.totalInStockItems();

        expect(result).toBe(240);
    });
});

const itemStockRepositoryMock = {
    findAllOutOfStock: async () => [],
    findAllInStock: async () => [],
};
