import { GoodsReturnService } from "~/lib/backend/application/goods_return_service";
import { useGoodsIssueRepository } from "~/composables/useGoodsIssueRepository";
import { useGoodsReturnRepository } from "~/composables/useGoodsReturnRepository";
import { useItemRepository } from "~/composables/useItemRepository";
import { useItemStockRepository } from "~/composables/useItemStockRepository";
import { useSequenceGenerator } from "~/composables/useSequenceGenerator";

const srv = new GoodsReturnService(
    useGoodsReturnRepository(),
    useGoodsIssueRepository(),
    useItemRepository(),
    useItemStockRepository(),
    useSequenceGenerator()
);

export const useGoodsReturnService = () => srv;
