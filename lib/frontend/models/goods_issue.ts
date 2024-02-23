import type { Condition } from "./condition";

export interface Purpose {
    description: string;
    details: string;
    notes?: string;
}

export interface GoodsIssueLine {
    itemId: string;
    quantity: number;
    condition?: Condition;
}

export interface GoodsIssueModel {
    total: string;
    returnDate: string;
    securityDeposit: string;
    purpose: Purpose;
    lines: GoodsIssueLine[];
}
