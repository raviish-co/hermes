import { GoodsReceiptNote } from "../../domain/goods_receipt/goods_receipt_note";
import { GoodsReceiptNoteNotFoundError } from "../../domain/goods_receipt/goods_receipt_note_not_found_error";
import type { GoodsReceiptNoteRepository } from "../../domain/goods_receipt/goods_receipt_note_repository";
import { left, right, type Either } from "../../shared/either";
import type { ID } from "../../shared/id";

export class InmemGoodsReceiptNoteRepository implements GoodsReceiptNoteRepository {
    #notes: Record<string, GoodsReceiptNote> = {};

    getAll(): Promise<GoodsReceiptNote[]> {
        return Promise.resolve(this.records);
    }

    save(goodsReceipt: GoodsReceiptNote): Promise<void> {
        this.#notes[goodsReceipt.noteId.toString()] = goodsReceipt;
        return Promise.resolve(undefined);
    }

    async getById(noteId: ID): Promise<Either<GoodsReceiptNoteNotFoundError, GoodsReceiptNote>> {
        const notes = this.records;

        for (const key in notes) {
            const note = notes[key];
            if (note.noteId.toString() === noteId.toString()) {
                return right(note);
            }
        }

        return left(
            new GoodsReceiptNoteNotFoundError(
                "InmemGoodsReceiptNoteRepository:getById",
                noteId.toString()
            )
        );
    }

    last(): Promise<GoodsReceiptNote> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): GoodsReceiptNote[] {
        return Object.values(this.#notes);
    }
}
