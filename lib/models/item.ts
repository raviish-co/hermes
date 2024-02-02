export interface Item {
    id: string;
    name: string;
    price: string;
    variations?: Variation[];
    isUnique: boolean;
    stock: number;
}

export interface Variation {
    name: string;
    value: string;
}

export interface RequestItem extends Item {
    total: string;
    quantity: number;
}

export enum ItemState {
    Good = "Bom",
    Bad = "Mau",
}
