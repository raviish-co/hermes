import { ID } from "../../shared/id";
import { GoodsReceiptLine } from "./goods_receipt_line";

export class GoodsReceiptNote {
    readonly goodsReceiptNoteId: ID;
    readonly entryDate: Date;
    readonly userId: ID;
    readonly goodsReceiptLines: GoodsReceiptLine[];

    constructor(noteId: ID, entryDate: Date, userId: ID, goodsReceiptLines: GoodsReceiptLine[]) {
        this.goodsReceiptNoteId = noteId;
        this.entryDate = entryDate;
        this.userId = userId;
        this.goodsReceiptLines = goodsReceiptLines;
    }
}
