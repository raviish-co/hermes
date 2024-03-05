import type { GoodsIssueLineBase, GoodsIssueBase } from "./goods_issue_base";
import type { Purpose } from "./purpose";

export interface GoodsIssueLine extends GoodsIssueLineBase {
    price: string;
    stock: number;
    total: string;
}

export interface GoodsIssue extends GoodsIssueBase {
    purposeSpecification: Purpose;
    lines: GoodsIssueLine[];
}
