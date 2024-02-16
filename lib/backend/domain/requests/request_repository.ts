import { ID } from "../../shared/id";
import { GoodsIssue } from "./request";

export interface GoodsIssueRepository {
    save(goodsIssue: GoodsIssue): Promise<void>;
    get(goodsIssueId: ID): Promise<GoodsIssue>;
    last(): Promise<GoodsIssue>;
}
