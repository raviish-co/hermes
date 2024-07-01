import { useGoodsIssueRepository } from "~/composables/useGoodsIssueRepository";
import { useItemRepository } from "~/composables/useItemRepository";
import { useItemStockRepository } from "~/composables/useItemStockRepository";
import { DashboardService } from "~/lib/backend/application/dashboard_service";

const srv = new DashboardService(
    useGoodsIssueRepository(),
    useItemRepository(),
    useItemStockRepository()
);

export const useDashboardService = () => srv;
