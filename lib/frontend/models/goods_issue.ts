import type { GoodsIssueBase, GoodsIssueLineBase } from "./goods_issue_base";

export interface GoodsIssueModel extends GoodsIssueBase {
    goodsIssueNoteId: string;
    purpose: Purpose;
    status: string;
    securityDeposit: string;
    lines: GoodsIssueLineBase[];
}

interface Purpose {
    description: string;
    details?: string;
    notes?: string;
}
