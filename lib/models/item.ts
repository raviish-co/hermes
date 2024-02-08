export interface Item {
    name: string;
    price: string;
    variations?: Variation[];
    isUnique: boolean;
    stock: number;
    itemId: string;
    state: ItemState;
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

export interface ItemState {
    status: ItemStateOption;
    comment?: string;
}

export enum ItemStateOption {
    Good = "Bom",
    Bad = "Mau",
}
