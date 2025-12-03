import { useGoodsIssueRepository } from "@app/composables/useGoodsIssueRepository";
import { useItemRepository } from "@app/composables/useItemRepository";
import { useItemStockRepository } from "@app/composables/useItemStockRepository";
import { usePurposeSpec } from "@app/composables/usePurposeSpec";
import { useSequenceGenerator } from "@app/composables/useSequenceGenerator";
import { GoodsIssueService } from "@backend/application/goods_issue_service";

const srv = new GoodsIssueService(
    useItemRepository(),
    useItemStockRepository(),
    useGoodsIssueRepository(),
    useSequenceGenerator(),
    usePurposeSpec()
);

export const useGoodsIssueService = () => srv;
