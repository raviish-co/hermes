import { ID } from "./id";

type PurposeData = {
    name: string;
    detail?: string;
    recipient?: string;
};

export type ItemQuery = {
    itemId: ID;
    variations?: ID[];
};

export type Condition = {
    status: string;
    comment?: string;
};

export type ItemData = {
    itemId: string;
    quantity: number;
    variations?: string[];
    condition?: Condition;
};

export type RequestData = {
    purposeData: PurposeData;
    itemsData: ItemData[];
    total: string;
    returnDate: string;
    securityDeposit: string;
};
