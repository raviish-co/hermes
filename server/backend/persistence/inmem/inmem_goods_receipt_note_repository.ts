import { GoodsReceiptNote } from "../../domain/goods_receipt/goods_receipt_note";
import { GoodsReceiptNoteNotFoundError } from "../../domain/goods_receipt/goods_receipt_note_not_found_error";
import type { GoodsReceiptNoteRepository } from "../../domain/goods_receipt/goods_receipt_note_repository";
import { left, right, type Either } from "../../shared/either";
import type { ID } from "../../shared/id";
import type { Pagination, PaginatorOptions } from "../../shared/pagination";

export class InmemGoodsReceiptNoteRepository implements GoodsReceiptNoteRepository {
    #notes: Record<string, GoodsReceiptNote> = {};

    getAll(opts?: PaginatorOptions): Promise<Pagination<GoodsReceiptNote>> {
        if (!opts) {
            return {
                result: this.records,
                perPage: 0,
                pageToken: 0,
                total: 0,
            } as unknown as Promise<Pagination<GoodsReceiptNote>>;
        }

        const startIndex = (opts.pageToken - 1) * opts.perPage;

        const endIndex = startIndex + opts.perPage;

        const result = this.records
            .sort((a, b) => b.noteId.localeCompare(a.noteId.toString()))
            .slice(startIndex, endIndex);

        const total = Math.ceil(this.records.length / opts.perPage);

        return {
            pageToken: opts.pageToken,
            perPage: opts.perPage,
            total,
            result,
        } as unknown as Promise<Pagination<GoodsReceiptNote>>;
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
