import { Item } from "../domain/catalog/item";

interface ItemDTO {
    id: string;
    name: string;
    price: string;
    isUnique: boolean;
    stock: number;
}

export function makeItemsDTO(items: Item[]): ItemDTO[] {
    return items.map((a) => ({
        id: a.itemId.toString(),
        name: a.product.name,
        price: a.product.price.value.toString(),
        isUnique: a.product.isUnique(),
        stock: 0,
    }));
}
