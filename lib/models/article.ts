export interface Article {
    id: string;
    name: string;
    price: string;
    securityDeposit: string;
    variations?: ArticleVariation[][];
    isUnique: boolean;
}

export interface ArticleVariation {
    name: string;
    value: string;
}

export interface Variation {
    items: string[];
    name: string;
}

export interface RequestArticle extends Article {
    requestId: string;
    total: string;
    quantity: number;
}

export enum ArticleState {
    Good = "Bom",
    Bad = "Mau",
}
