import type { ItemModel } from "../models/item";

interface ItemList {
    items: ItemModel[];
    total: number;
}

export class CatalogService {
    async searchItems(
        query: string,
        pageToken: number = 1,
        perPage: number = 8
    ): Promise<ItemList> {
        const response = await $fetch(
            `/api/search_items?query=${query}&pageToken=${pageToken}&perPage=${perPage}`,
            {
                method: "get",
            }
        );

        return { items: response.items, total: response.total };
    }

    async listItems(pageToken: number = 1, perPage: number = 8): Promise<ItemList> {
        const response = await $fetch(`/api/items?pageToken=${pageToken}&perPage=${perPage}`, {
            method: "get",
        });

        return { items: response.items, total: response.total };
    }
}
