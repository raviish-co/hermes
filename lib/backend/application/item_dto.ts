import { Item } from "../domain/catalog/item";

interface ItemDTO {
    itemId: string;
    name: string;
    price: string;
    stock: number;
    state: ItemStateDTO;
}

export interface ItemStateDTO {
    status: "Bom" | "Mau";
    comment?: string;
}

export function makeItemsDTO(items: Item[]): ItemDTO[] {
    return items.map((i) => ({
        itemId: i.itemId.toString(),
        name: i.name,
        price: i.price.value.toString(),
        stock: i.getStock().quantity,
        state: {
            status: i.getCondition().status,
            comment: i.getCondition().comment,
        },
    }));
}
