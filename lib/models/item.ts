export interface Item {
    id: string;
    name: string;
    price: string;
    variations?: ItemVariation[][];
    isUnique: boolean;
    stock: number;
}

export interface ItemVariation {
    name: string;
    value: string;
}

export interface Variation {
    items: string[];
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
