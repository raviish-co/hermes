import type { GoodsIssueBase, GoodsIssueLineBase } from "./goods_issue_base";
import type { PurposeModel } from "./purpose";

export interface GoodsIssueModel extends GoodsIssueBase {
    purpose: PurposeModel;
    goodsIssueId: string;
    status: string;
    securityDeposit: string;
    lines: GoodsIssueLineBase[];
}
