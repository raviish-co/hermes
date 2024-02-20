import type { GoodsIssueRepository } from "../../domain/goods_issue/goods_issue_repository";
import { GoodsIssue } from "../../domain/goods_issue/goods_issue";
import { ID } from "../../shared/id";

export class InmemGoodsIssueRepository implements GoodsIssueRepository {
    #goodsIssues: Record<string, GoodsIssue> = {};

    save(goodsIssue: GoodsIssue): Promise<void> {
        this.#goodsIssues[goodsIssue.goodsIssueId.toString()] = goodsIssue;
        return Promise.resolve(undefined);
    }

    get(goodsIssueId: ID): Promise<GoodsIssue> {
        const goodsIssue = this.#goodsIssues[goodsIssueId.toString()];
        return Promise.resolve(goodsIssue);
    }

    last(): Promise<GoodsIssue> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): GoodsIssue[] {
        return Object.values(this.#goodsIssues);
    }
}
