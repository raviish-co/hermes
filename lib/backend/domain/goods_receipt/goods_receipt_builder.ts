import { left, right, type Either } from "../../shared/either";
import { ID } from "../../shared/id";
import { GoodsReceiptLine } from "./goods_receipt_line";
import { GoodsReceiptNote } from "./goods_receipt_note";

export class GoodsReceiptBuilder {
    #goodsReceiptNoteId?: ID;
    #entryDate?: Date;
    #userId?: ID;
    #lines: GoodsReceiptLine[] = [];

    withGoodsReceiptNoteId(noteId: string) {
        this.#goodsReceiptNoteId = ID.fromString(noteId);
        return this;
    }

    withEntryDate(entryDate: string) {
        this.#entryDate = new Date(entryDate);
        return this;
    }

    withUser(userId: string) {
        this.#userId = ID.fromString(userId);
        return this;
    }

    withLines(lines: GoodsReceiptLine[]) {
        this.#lines = lines;
        return this;
    }

    build(): Either<Error, GoodsReceiptNote> {
        if (!this.#goodsReceiptNoteId) return left(new Error("goodsReceiptId is required"));

        if (!this.#entryDate) return left(new Error("entryDate is required"));

        if (!this.#userId) return left(new Error("userId is required"));

        const goodsReceipt = new GoodsReceiptNote(
            this.#goodsReceiptNoteId,
            this.#entryDate,
            this.#userId,
            this.#lines
        );

        return right(goodsReceipt);
    }
}
