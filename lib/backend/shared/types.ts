import { ID } from "./id";

export type PurposeDTO = {
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

export type GoodIssueLineDTO = {
    itemId: string;
    quantity: number;
    variations?: string[];
    condition?: Condition;
};

export type GoodsIssueDTO = {
    purpose: PurposeDTO;
    goodIssueLines: GoodIssueLineDTO[];
    total: string;
    returnDate: string;
    securityDeposit: string;
};