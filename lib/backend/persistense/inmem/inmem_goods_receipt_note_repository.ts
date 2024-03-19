import { GoodsReceiptNote } from "../../domain/goods_receipt/goods_receipt_note";
import type { GoodsReceiptNoteRepository } from "../../domain/goods_receipt/goods_receipt_note_repository";

export class InmemGoodsReceiptNoteRepository implements GoodsReceiptNoteRepository {
    #goodsReceipts: Record<string, GoodsReceiptNote> = {};

    save(goodsReceipt: GoodsReceiptNote): Promise<void> {
        this.#goodsReceipts[goodsReceipt.goodsReceiptNoteId.toString()] = goodsReceipt;
        return Promise.resolve(undefined);
    }

    last(): Promise<GoodsReceiptNote> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): GoodsReceiptNote[] {
        return Object.values(this.#goodsReceipts);
    }
}
