import { Item } from "../domain/catalog/item";
import { Variation } from "../domain/catalog/variation";

interface ItemDTO {
    itemId: string;
    name: string;
    price: string;
    isUnique: boolean;
    stock: number;
    variation?: VariationDTO;
    state: ItemStateDTO;
}

interface VariationDTO {
    id: string;
    name: string;
    value: string;
}

export interface ItemStateDTO {
    status: ItemStateOption;
    comment?: string;
}

export enum ItemStateOption {
    Good = "Bom",
    Bad = "Mau",
}

export function makeItemsDTO(items: Item[]): ItemDTO[] {
    return items.map((i) => ({
        itemId: i.itemId.toString(),
        name: i.name,
        price: i.price.value.toString(),
        isUnique: i.isUnique(),
        stock: i.getStock().getQuantity(),
        variations: makeVariationDTO(i.variations),
        state: {
            status: i.getCondition().status.toString() as ItemStateOption,
            comment: i.getCondition().comment,
        },
    }));
}

function makeVariationDTO(variations?: Variation[]): VariationDTO[] | undefined {
    if (!variations) return;

    return variations.map((v) => ({
        id: v.variationId.toString(),
        name: v.attribute.name,
        value: v.value.value,
    }));
}
