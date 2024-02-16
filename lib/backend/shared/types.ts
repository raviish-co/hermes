import { ID } from "./id";

export type PurposeData = {
    description: string;
    detailConstraint?: string;
    notes?: string;
};

export type ItemQuery = {
    itemId: ID;
    variations?: ID[];
};

export type Condition = {
    status: string;
    comment?: string;
};

export type GoodIssueLine = {
    itemId: string;
    quantity: number;
    variations?: string[];
    condition?: Condition;
};

export type GoodsIssueDTO = {
    purpose: PurposeData;
    goodIssueLines: GoodIssueLine[];
    total: string;
    returnDate: string;
    securityDeposit: string;
};
