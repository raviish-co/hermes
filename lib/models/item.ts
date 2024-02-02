export interface Item {
    id: string;
    name: string;
    price: string;
    variations?: Variation[];
    isUnique: boolean;
    stock: number;
    productId: string;
}

export interface Variation {
    id: string;
    value: string;
    name: string;
}

export interface RequestItem extends Item {
    total: string;
    quantity: number;
}

export enum ItemState {
    Good = "Bom",
    Bad = "Mau",
}
