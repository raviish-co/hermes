export interface PurposeData {
    name: string;
    section?: string;
    recipient?: string;
}

export interface ItemData {
    itemId: string;
    quantity: number;
    variations?: string[];
    condition?: Condition;
}

export interface RequestData {
    total: string;
    returnDate: string;
    securityDeposit: string;
    purposeData: PurposeData;
    productsData: ItemData[];
}

export interface Condition {
    status: string;
    comment?: string | undefined;
}
