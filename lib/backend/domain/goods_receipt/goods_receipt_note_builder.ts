import { left, right, type Either } from "../../shared/either";
import { ID } from "../../shared/id";
import { GoodsReceiptNote } from "./goods_receipt_note";
import { GoodsReceiptNoteLine } from "./goods_receipt_note_line";

export class GoodsReceiptNoteBuilder {
    #noteId?: ID;
    #entryDate?: Date;
    #userId?: ID;
    #lines: GoodsReceiptNoteLine[] = [];

    withNoteId(noteId: string) {
        this.#noteId = ID.fromString(noteId);
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

    withLines(lines: GoodsReceiptNoteLine[]) {
        this.#lines = lines;
        return this;
    }

    build(): Either<Error, GoodsReceiptNote> {
        if (!this.#noteId) return left(new Error("noteId is required"));

        if (!this.#entryDate) return left(new Error("entryDate is required"));

        const note = new GoodsReceiptNote(this.#noteId, this.#entryDate, this.#lines, this.#userId);

        return right(note);
    }
}
