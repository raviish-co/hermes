import { Item } from "../../lib/backend/domain/catalog/item";

export interface ItemDTO {
    itemId: string;
    name: string;
    price: string;
    categoryId: string;
    variationsValues: string[];
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
        variationsValues: [],
        quantity: item.getStock().quantity,
        condition: {
            status: item.getCondition().status,
            comment: item.getCondition()?.comment,
        },
    };
}
