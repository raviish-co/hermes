import { Item } from "../../lib/backend/domain/catalog/item";

interface VariationValues {
    variationId: string;
    value: string;
}

export interface ItemDTO {
    itemId: string;
    name: string;
    price: string;
    categoryId: string;
    variationsValues: VariationValues[];
    quantity: number;
    condition: {
        status: "Bom" | "Mau";
        comment?: string;
    };
}

export function toItemDTO(item: Item): ItemDTO {
    return {
        itemId: item.itemId.toString(),
        name: item.name,
        price: item.price.value,
        categoryId: item.categoryId.toString(),
        variationsValues: toVariationValuesDTO(item),
        quantity: item.getStock().quantity,
        condition: {
            status: item.getCondition().status,
            comment: item.getCondition()?.comment,
        },
    };
}

function toVariationValuesDTO(item: Item): VariationValues[] {
    return Object.entries(item.variations).map(([variationId, value]) => ({
        variationId,
        value,
    }));
}
