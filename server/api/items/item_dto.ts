import { Item } from "../../../lib/backend/domain/catalog/items/item";

interface VariationValues {
    variationId: string;
    name: string;
    value: string;
    fulltext: string;
}

export interface ItemDTO {
    itemId: string;
    name: string;
    price: number;
    sectionId?: string;
    categoryId?: string;
    variationsValues?: VariationValues[];
    tags?: string[];
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
        sectionId: item.sectionId?.toString(),
        categoryId: item.categoryId?.toString(),
        variationsValues: toVariationValuesDTO(item.variations),
        stock: item.stock.quantity,
        tags: item.tags,
        condition: {
            status: item.getCondition().status,
            comment: item.getCondition()?.comment,
        },
    };
}

export function toVariationValuesDTO(variations?: Record<string, string>): VariationValues[] {
    if (!variations) return [];

    return Object.entries(variations).map(([variationId, value]) => ({
        variationId: variationId,
        name: value.split(":")?.at(0) ?? "",
        value: value.split(":")?.at(1) ?? "",
        fulltext: value,
    }));
}
