export interface Condition {
    status: "Bom" | "Mau";
    comment?: string | undefined;
}

export interface Purpose {
    description: string;
    details: string;
    notes?: string;
}

export interface GoodsIssueLine {
    itemId: string;
    quantity: number;
    variations?: string[];
    condition?: Condition;
}

export interface GoodsIssueModel {
    total: string;
    returnDate: string;
    securityDeposit: string;
    purposeData: Purpose;
    productsData: GoodsIssueLine[];
}
