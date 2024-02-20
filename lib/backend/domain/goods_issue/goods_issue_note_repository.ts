import { GoodsIssue } from "./goods_issue_note";
import { ID } from "../../shared/id";

export interface GoodsIssueRepository {
    save(goodsIssue: GoodsIssue): Promise<void>;
    get(goodsIssueId: ID): Promise<GoodsIssue>;
    last(): Promise<GoodsIssue>;
}
