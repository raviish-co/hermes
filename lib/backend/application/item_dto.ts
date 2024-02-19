import { ItemCategory } from "@backend/domain/catalog/item_category";

interface ItemDTO {
    itemId: string;
    name: string;
    price: string;
    isUnique: boolean;
    stock: number;
    state: ItemStateDTO;
}

export interface ItemStateDTO {
    status: "Bom" | "Mau";
    comment?: string;
}

export function makeItemsDTO(items: ItemCategory[]): ItemDTO[] {
    return items.map((i) => ({
        itemId: i.itemId.toString(),
        name: i.name,
        price: i.price.value.toString(),
        isUnique: i.isUnique(),
        stock: i.getStock().getQuantity(),
        state: {
            status: i.getCondition().status,
            comment: i.getCondition().comment,
        },
    }));
}
