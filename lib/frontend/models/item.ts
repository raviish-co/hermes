import type { VariationValueModel } from "./variation_value";

export interface ItemModel {
    itemId: string;
    name: string;
    price: number;
    categoryId?: string;
    sectionId?: string;
    variationsValues?: VariationValueModel[];
    tags?: string[];
}
