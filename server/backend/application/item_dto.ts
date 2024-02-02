import { Item } from "../domain/catalog/item";
import { Variation } from "../domain/catalog/variation";
import { ID } from "../shared/id";

interface ItemDTO {
    id: string;
    name: string;
    price: string;
    isUnique: boolean;
    stock: number;
    variation?: string;
}

interface VariationDTO {
    name: string;
    value: string;
}

export function makeItemsDTO(items: Item[]): ItemDTO[] {
    return items.map((a) => ({
        id: a.itemId.toString(),
        name: a.product.name,
        price: a.product.price.value.toString(),
        isUnique: a.product.isUnique(),
        stock: a.getStock().getQuantity(),
        variations: makeVariationDTO(a.variations),
    }));
}

function makeVariationDTO(variations?: Variation[]): VariationDTO[] | undefined {
    if (!variations) return;

    return variations.map((v) => ({
        name: v.attribute.name,
        value: v.value.value,
    }));
}
