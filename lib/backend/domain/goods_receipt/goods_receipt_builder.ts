import { left, right, type Either } from "../../shared/either";
import { ID } from "../../shared/id";
import { GoodsReceiptLine } from "./goods_receipt_line";
import { GoodsReceiptNote } from "./goods_receipt_note";
import { MissingDependency } from "./missing_dependency_error";

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

    build(): Either<MissingDependency, GoodsReceiptNote> {
        if (!this.#goodsReceiptNoteId) return left(new MissingDependency("goodsReceiptId"));

        if (!this.#entryDate) return left(new MissingDependency("entryDate"));

        if (!this.#userId) return left(new MissingDependency("userId"));

        const goodsReceipt = new GoodsReceiptNote(
            this.#goodsReceiptNoteId,
            this.#entryDate,
            this.#userId,
            this.#lines
        );

        return right(goodsReceipt);
    }
}
