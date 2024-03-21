import type { GoodsReturnNoteRepository } from "../../domain/goods_return/goods_return_note_repository";
import { GoodsReturnNoteNotFound } from "../../domain/goods_return/goods_return_note_not_found_error";
import { GoodsReturnNote } from "../../domain/goods_return/goods_return_note";
import { ID } from "../../shared/id";
import { left, right, type Either } from "../../shared/either";

export class InmemGoodsReturnNoteRepository implements GoodsReturnNoteRepository {
    #notes: Record<string, GoodsReturnNote> = {};

    save(note: GoodsReturnNote): Promise<void> {
        this.#notes[note.goodsReturnNoteId.toString()] = note;
        return Promise.resolve(undefined);
    }

    getById(id: ID): Promise<Either<GoodsReturnNoteNotFound, GoodsReturnNote>> {
        const note = this.records.find((note) => note.goodsReturnNoteId.equals(id));

        if (!note) return Promise.resolve(left(new GoodsReturnNoteNotFound()));

        return Promise.resolve(right(note));
    }

    getAll(): Promise<GoodsReturnNote[]> {
        return Promise.resolve(this.records);
    }

    get records(): GoodsReturnNote[] {
        return Object.values(this.#notes);
    }
}
