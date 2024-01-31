export interface Product {
    id: string;
    name: string;
    price: string;
    variations?: ProductVariation[][];
    isUnique: boolean;
}

export interface ProductVariation {
    name: string;
    value: string;
}

export interface Variation {
    items: string[];
    name: string;
}

export interface RequestProduct extends Product {
    requestId: string;
    total: string;
    quantity: number;
}

export enum ProductState {
    Good = "Bom",
    Bad = "Mau",
}
