import { ID } from "../../shared/id";
import { GoodsReceiptNoteLine } from "./goods_receipt_note_line";

export class GoodsReceiptNote {
    readonly noteId: ID;
    readonly entryDate: Date;
    readonly userId?: ID;
    readonly lines: GoodsReceiptNoteLine[];

    constructor(noteId: ID, entryDate: Date, lines: GoodsReceiptNoteLine[], userId?: ID) {
        this.noteId = noteId;
        this.entryDate = entryDate;
        this.userId = userId;
        this.lines = lines;
    }
}
