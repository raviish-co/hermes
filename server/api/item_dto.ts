import { Item } from "../../lib/backend/domain/catalog/item";

interface VariationValues {
    variationId: string;
    value: string;
}

export interface ItemDTO {
    itemId: string;
    name: string;
    price: number;
    categoryId?: string;
    variationsValues?: VariationValues[];
    stock: number;
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
        categoryId: item.categoryId?.toString(),
        variationsValues: toVariationValuesDTO(item.variations),
        stock: item.stock.quantity,
        condition: {
            status: item.getCondition().status,
            comment: item.getCondition()?.comment,
        },
    };
}

export function toVariationValuesDTO(variations?: Record<string, string>): VariationValues[] {
    if (!variations) return [];

    return Object.entries(variations).map(([variationId, value]) => ({
        variationId,
        value,
    }));
}
