export interface PurposeData {
    name: string;
    section?: string;
    recipient?: string;
}

export interface ProductData {
    productId: string;
    quantity: number;
    variations?: string[];
    condition?: Condition;
}

export interface RequestItems {
    total: string;
    returnDate: string;
    securityDeposit: string;
    purposeData: PurposeData;
    productsData: ProductData[];
}

export interface Condition {
    status: string;
    comment?: string | undefined;
}
