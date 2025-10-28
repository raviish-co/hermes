import { useGoodsIssueRepository } from "@app/composables/useGoodsIssueRepository";
import { useItemRepository } from "@app/composables/useItemRepository";
import { useItemStockRepository } from "@app/composables/useItemStockRepository";
import { DashboardService } from "@backend/application/dashboard_service";

const srv = new DashboardService(
    useGoodsIssueRepository(),
    useItemRepository(),
    useItemStockRepository()
);

export const useDashboardService = () => srv;
