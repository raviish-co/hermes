import type { GoodsIssueRepository } from "../../domain/goods_issue/goods_issue_note_repository";
import { GoodsIssueNote } from "../../domain/goods_issue/goods_issue_note";
import { ID } from "../../shared/id";

export class InmemGoodsIssueRepository implements GoodsIssueRepository {
    #goodsIssues: Record<string, GoodsIssueNote> = {};

    save(goodIssueNote: GoodsIssueNote): Promise<void> {
        this.#goodsIssues[goodIssueNote.goodsIssueNoteId.toString()] = goodIssueNote;
        return Promise.resolve(undefined);
    }

    get(goodsIssueId: ID): Promise<GoodsIssueNote> {
        const goodsIssue = this.#goodsIssues[goodsIssueId.toString()];
        return Promise.resolve(goodsIssue);
    }

    last(): Promise<GoodsIssueNote> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): GoodsIssueNote[] {
        return Object.values(this.#goodsIssues);
    }
}
