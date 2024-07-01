import { useGoodsIssueRepository } from "~/composables/useGoodsIssueRepository";
import { useItemRepository } from "~/composables/useItemRepository";
import { useItemStockRepository } from "~/composables/useItemStockRepository";
import { usePurposeSpec } from "~/composables/usePurposeSpec";
import { useSequenceGenerator } from "~/composables/useSequenceGenerator";
import { GoodsIssueService } from "~/lib/backend/application/goods_issue_service";

const srv = new GoodsIssueService(
    useItemRepository(),
    useItemStockRepository(),
    useGoodsIssueRepository(),
    useSequenceGenerator(),
    usePurposeSpec()
);

export const useGoodsIssueService = () => srv;
