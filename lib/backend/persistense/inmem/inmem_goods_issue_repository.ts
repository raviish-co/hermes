import type { GoodsIssueRepository } from "@backend/domain/requests/request_repository";
import { GoodsIssue } from "@backend/domain/requests/request";
import { ID } from "@backend/shared/id";

export class InmemGoodsIssueRepository implements GoodsIssueRepository {
    #goodsIssues: Record<string, GoodsIssue> = {};

    save(goodsIssue: GoodsIssue): Promise<void> {
        this.#goodsIssues[goodsIssue.requestId.toString()] = goodsIssue;
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
