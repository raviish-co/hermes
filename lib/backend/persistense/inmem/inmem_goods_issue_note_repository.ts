import type { GoodsIssueNoteRepository } from "../../domain/goods_issue/goods_issue_note_repository";
import { GoodsIssueNote } from "../../domain/goods_issue/goods_issue_note";
import { ID } from "../../shared/id";
import { left, right, type Either } from "../../shared/either";
import { GoodsIssueNoteNotFound } from "../../domain/goods_issue/goods_issue_note_not_found_error";

export class InmemGoodsIssueNoteRepository implements GoodsIssueNoteRepository {
    #notes: Record<string, GoodsIssueNote> = {};

    constructor(notes?: GoodsIssueNote[]) {
        if (notes) {
            notes.forEach((note) => (this.#notes[note.noteId.toString()] = note));
        }
    }

    getById(goodsIssueId: ID): Promise<Either<GoodsIssueNoteNotFound, GoodsIssueNote>> {
        const goodsIssueNote = this.records.find(
            (g) => g.noteId.toString() === goodsIssueId.toString()
        );
        if (!goodsIssueNote) return Promise.resolve(left(new GoodsIssueNoteNotFound()));
        return Promise.resolve(right(goodsIssueNote));
    }

    getAll(): Promise<GoodsIssueNote[]> {
        return Promise.resolve(this.records);
    }

    search(query: string): Promise<GoodsIssueNote[]> {
        const notes = this.records.filter(
            (note) =>
                note.noteId.toString().includes(query) ||
                note.fulltext.includes(query.toLowerCase())
        );
        return Promise.resolve(notes);
    }

    save(goodIssueNote: GoodsIssueNote): Promise<void> {
        this.#notes[goodIssueNote.noteId.toString()] = goodIssueNote;
        return Promise.resolve(undefined);
    }

    update(goodsIssue: GoodsIssueNote): Promise<void> {
        this.#notes[goodsIssue.noteId.toString()] = goodsIssue;
        return Promise.resolve(undefined);
    }

    last(): Promise<GoodsIssueNote> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): GoodsIssueNote[] {
        return Object.values(this.#notes);
    }
}
