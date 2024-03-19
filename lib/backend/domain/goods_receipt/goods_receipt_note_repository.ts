import { GoodsReceiptNote } from "./goods_receipt_note";

export interface GoodsReceiptNoteRepository {
    save(goodsReceipt: GoodsReceiptNote): Promise<void>;
    last(): Promise<GoodsReceiptNote>;
}
