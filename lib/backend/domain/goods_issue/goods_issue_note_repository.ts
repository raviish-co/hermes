import { GoodsIssueNote } from "./goods_issue_note";
import { ID } from "../../shared/id";

export interface GoodsIssueRepository {
    save(goodsIssue: GoodsIssueNote): Promise<void>;
    get(goodsIssueId: ID): Promise<GoodsIssueNote>;
    last(): Promise<GoodsIssueNote>;
}
