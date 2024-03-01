import type { GoodsIssueLineBase, GoodsIssueBase } from "./goods_issue_base";
import type { PurposeSpecification } from "./purpose_specification";

export interface GoodsIssueLine extends GoodsIssueLineBase {
    price: string;
    stock: number;
    total: string;
}

export interface GoodsIssue extends GoodsIssueBase {
    purposeSpecification: PurposeSpecification;
    lines: GoodsIssueLine[];
}
