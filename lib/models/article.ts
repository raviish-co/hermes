export interface Variation {
    items: string[];
    name: string;
}

export interface Article {
    id: string;
    name: string;
    price: number;
    securityDeposit: number;
    variations?: Variation[];
    isUnique: boolean;
}

export interface RequestRow {
    id: string;
    name: string;
    price: number;
    isUnique: boolean;
    securityDeposit: number;
    variationName: string;
    variationItem: string;
    total: number;
    quantity: number;
}
