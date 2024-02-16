export interface VariationValue {
    variationId: string;
    value: string;
}

export interface ItemModel {
    itemId: string;
    name: string;
    price: string;
    categoryId: string;
    variationsValues: VariationValue[];
    isUnique: boolean;
    stock: number;
    state: "Bom" | "Mau";
}

export interface Variation {
    id: string;
    value: string;
    name: string;
}
