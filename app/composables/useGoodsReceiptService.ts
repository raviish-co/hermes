import { GoodsReceiptService } from "@backend/application/goods_receipt_service";
import { useGoodsReceiptRepository } from "@app/composables/useGoodsReceiptRepository";
import { useItemRepository } from "@app/composables/useItemRepository";
import { useItemStockRepository } from "@app/composables/useItemStockRepository";
import { useSequenceGenerator } from "@app/composables/useSequenceGenerator";

const srv = new GoodsReceiptService(
    useItemRepository(),
    useItemStockRepository(),
    useGoodsReceiptRepository(),
    useSequenceGenerator()
);

export const useGoodsReceiptService = () => srv;
