import { GoodsReceiptNote } from "./goods_receipt_note";

export interface GoodsReceiptNoteRepository {
    getAll(): Promise<GoodsReceiptNote[]>;
    save(goodsReceipt: GoodsReceiptNote): Promise<void>;
    last(): Promise<GoodsReceiptNote>;
}
