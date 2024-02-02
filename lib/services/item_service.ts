import type { Item } from "../models/item";

interface ItemList {
    items: Item[];
    total: number;
}

export class ItemService {
    async searchItems(query: string): Promise<Item[]> {
        const response = await $fetch(`/api/search_items?query=${query}`, {
            method: "get",
        });

        return response.items;
    }

    async listItems(pageToken?: number): Promise<ItemList> {
        const response = await $fetch(`/api/items?pageToken=${pageToken}`, {
            method: "get",
        });

        return { items: response.items, total: response.total };
    }
}
