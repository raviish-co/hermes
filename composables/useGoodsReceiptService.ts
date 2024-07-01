import { GoodsReceiptService } from "~/lib/backend/application/goods_receipt_service";
import { useGoodsReceiptRepository } from "~/composables/useGoodsReceiptRepository";
import { useItemRepository } from "~/composables/useItemRepository";
import { useItemStockRepository } from "~/composables/useItemStockRepository";
import { useSequenceGenerator } from "~/composables/useSequenceGenerator";

const srv = new GoodsReceiptService(
    useItemRepository(),
    useItemStockRepository(),
    useGoodsReceiptRepository(),
    useSequenceGenerator()
);

export const useGoodsReceiptService = () => srv;
