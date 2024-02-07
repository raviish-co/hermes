import { ID } from "./id";

type PurposeData = {
    name: string;
    section?: string;
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
    productsData: ItemData[];
    total: string;
    returnDate: string;
    securityDeposit: string;
};

export type UploadData = {
    department: string;
    categoryName: string;
    subcategoryName: string;
    file: File;
};
