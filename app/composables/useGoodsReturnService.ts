import { GoodsReturnService } from "@backend/application/goods_return_service";
import { useGoodsIssueRepository } from "@app/composables/useGoodsIssueRepository";
import { useGoodsReturnRepository } from "@app/composables/useGoodsReturnRepository";
import { useItemRepository } from "@app/composables/useItemRepository";
import { useItemStockRepository } from "@app/composables/useItemStockRepository";
import { useSequenceGenerator } from "@app/composables/useSequenceGenerator";

const srv = new GoodsReturnService(
    useGoodsReturnRepository(),
    useGoodsIssueRepository(),
    useItemRepository(),
    useItemStockRepository(),
    useSequenceGenerator()
);

export const useGoodsReturnService = () => srv;
