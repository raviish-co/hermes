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

    async getById(noteId: ID): Promise<Either<GoodsIssueNoteNotFound, GoodsIssueNote>> {
        const note = this.records.find((g) => g.noteId.toString() === noteId.toString());
        if (!note) return left(new GoodsIssueNoteNotFound());
        return right(note);
    }

    async getAll(): Promise<GoodsIssueNote[]> {
        return this.records;
    }

    async search(query: string): Promise<GoodsIssueNote[]> {
        const notes = this.records.filter(
            (note) =>
                note.noteId.toString().includes(query) ||
                note.fulltext.includes(query.toLowerCase())
        );
        return notes;
    }

    async save(goodIssueNote: GoodsIssueNote): Promise<void> {
        this.#notes[goodIssueNote.noteId.toString()] = goodIssueNote;
    }

    async update(goodsIssue: GoodsIssueNote): Promise<void> {
        this.#notes[goodsIssue.noteId.toString()] = goodsIssue;
    }

    async last(): Promise<GoodsIssueNote> {
        return this.records[this.records.length - 1];
    }

    get records(): GoodsIssueNote[] {
        return Object.values(this.#notes);
    }
}
