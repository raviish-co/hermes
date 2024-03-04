import type { GoodsIssueBase, GoodsIssueLineBase } from "./goods_issue_base";

interface Purpose {
    description: string;
    details?: string;
    notes?: string;
}

export interface GoodsIssueNoteModel extends GoodsIssueBase {
    goodsIssueNoteId: string;
    purpose: Purpose;
    status: string;
    securityDeposit: string;
    lines: GoodsIssueLineBase[];
}
