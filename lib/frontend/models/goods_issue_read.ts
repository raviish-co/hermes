import type { GoodsIssueBase, GoodsIssueLineBase } from "./goods_issue_base";

export interface GoodsIssueModel extends GoodsIssueBase {
    goodsIssueNoteId: string;
    purpose: {
        description: string;
        details?: string;
        notes?: string;
    };
    status: string;
    securityDeposit: string;
    lines: GoodsIssueLineBase[];
}
