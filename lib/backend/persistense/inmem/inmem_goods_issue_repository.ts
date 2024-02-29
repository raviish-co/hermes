import type { GoodsIssueRepository } from "../../domain/goods_issue/goods_issue_note_repository";
import { GoodsIssueNote } from "../../domain/goods_issue/goods_issue_note";
import { ID } from "../../shared/id";
import { left, right, type Either } from "../../shared/either";
import { GoodsIssueNoteNotFound } from "../../domain/goods_issue/goods_issue_note_not_found_error";

export class InmemGoodsIssueRepository implements GoodsIssueRepository {
    #goodsIssues: Record<string, GoodsIssueNote> = {};

    constructor(notes?: GoodsIssueNote[]) {
        if (notes) {
            notes.forEach((note) => (this.#goodsIssues[note.goodsIssueNoteId.toString()] = note));
        }
    }

    getById(goodsIssueId: ID): Promise<Either<GoodsIssueNoteNotFound, GoodsIssueNote>> {
        const goodsIssue = this.records.find(
            (g) => g.goodsIssueNoteId.toString() === goodsIssueId.toString()
        );
        if (!goodsIssue) return Promise.resolve(left(new GoodsIssueNoteNotFound()));
        return Promise.resolve(right(goodsIssue));
    }

    getAll(): Promise<GoodsIssueNote[]> {
        return Promise.resolve(this.records);
    }

    save(goodIssueNote: GoodsIssueNote): Promise<void> {
        this.#goodsIssues[goodIssueNote.goodsIssueNoteId.toString()] = goodIssueNote;
        return Promise.resolve(undefined);
    }

    update(goodsIssue: GoodsIssueNote): Promise<void> {
        this.#goodsIssues[goodsIssue.goodsIssueNoteId.toString()] = goodsIssue;
        return Promise.resolve(undefined);
    }

    last(): Promise<GoodsIssueNote> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): GoodsIssueNote[] {
        return Object.values(this.#goodsIssues);
    }
}
