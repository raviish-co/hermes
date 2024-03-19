import type { GoodsReturnNoteRepository } from "../../domain/goods_return/goods_return_note_repository";
import { GoodsReturnNote } from "../../domain/goods_return/goods_return_note";
import { ID } from "../../shared/id";

export class InmemGoodsReturnNoteRepository implements GoodsReturnNoteRepository {
    #notes: Record<string, GoodsReturnNote> = {};

    save(note: GoodsReturnNote): Promise<void> {
        this.#notes[note.goodsReturnNoteId.toString()] = note;
        return Promise.resolve(undefined);
    }

    getById(id: ID): Promise<GoodsReturnNote> {
        return Promise.resolve(this.#notes[id.toString()]);
    }

    getAll(): Promise<GoodsReturnNote[]> {
        return Promise.resolve(this.records);
    }

    get records(): GoodsReturnNote[] {
        return Object.values(this.#notes);
    }
}
