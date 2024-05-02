import { describe, expect, it } from "vitest";
import { GoodsIssueRepositoryStub } from "../stubs/goods_issue_repository_stub";
import { InmemGoodsIssueNoteRepository } from "../../persistense/inmem/inmem_goods_issue_note_repository";
import { DashboardService } from "../../application/dashboard_service";

describe("Dashboard Service - Total de guias de saída vencidas", async () => {
    it("Deve retornar 0 se não houver guias de saída vencidas", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();

        const service = new DashboardService(goodsIssueRepository);

        const result = await service.totalExpiredGoodsIssueNotes();

        expect(result).toBe(0);
    });

    it("Deve retornar o total de guias de saída vencida", async () => {
        const goodsIssueRepository = new GoodsIssueRepositoryStub();

        const service = new DashboardService(goodsIssueRepository);

        const result = await service.totalExpiredGoodsIssueNotes();

        expect(result).toBeGreaterThanOrEqual(1);
    });
});
