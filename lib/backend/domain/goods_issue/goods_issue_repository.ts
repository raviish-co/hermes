import { GoodsIssue } from "../../domain/goods_issue/goods_issue";
import { ID } from "../../shared/id";

export interface GoodsIssueRepository {
    save(goodsIssue: GoodsIssue): Promise<void>;
    get(goodsIssueId: ID): Promise<GoodsIssue>;
    last(): Promise<GoodsIssue>;
}
