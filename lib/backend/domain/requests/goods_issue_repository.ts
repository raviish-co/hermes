import { GoodsIssue } from "@backend/domain/requests/goods_issue";
import { ID } from "@backend/shared/id";

export interface GoodsIssueRepository {
    save(goodsIssue: GoodsIssue): Promise<void>;
    get(goodsIssueId: ID): Promise<GoodsIssue>;
    last(): Promise<GoodsIssue>;
}