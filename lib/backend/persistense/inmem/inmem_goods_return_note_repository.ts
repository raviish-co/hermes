import type { GoodsReturnNote } from "../../domain/goods_return_note";
import type { GoodsReturnNoteRepository } from "../../domain/goods_return_note_repository";

export class InmemGoodsReturnNoteRepository implements GoodsReturnNoteRepository {
    #notes: Record<string, GoodsReturnNote> = {};

    save(note: GoodsReturnNote): Promise<void> {
        this.#notes[note.goodsReturnsNoteId.toString()] = note;
        return Promise.resolve(undefined);
    }

    last(): Promise<GoodsReturnNote> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): GoodsReturnNote[] {
        return Object.values(this.#notes);
    }
}
