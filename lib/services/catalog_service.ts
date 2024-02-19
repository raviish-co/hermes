import type { ItemModel } from "../models/item";
import type { VariationModel } from "../models/variation";

export class CatalogService {
    async searchItems(
        query: string,
        pageToken: number = 1,
        perPage: number = 8
    ): Promise<{ items: ItemModel[]; total: number }> {
        const response = await $fetch(
            `/api/search_items?query=${query}&pageToken=${pageToken}&perPage=${perPage}`,
            {
                method: "get",
            }
        );

        return { items: response.items, total: response.total };
    }

    async listItems(
        pageToken: number = 1,
        perPage: number = 8
    ): Promise<{ items: ItemModel[]; total: number }> {
        const response = await $fetch(`/api/items?pageToken=${pageToken}&perPage=${perPage}`, {
            method: "get",
        });

        return { items: response.items, total: response.total };
    }

    async listVariations(): Promise<VariationModel[]> {
        return [];
    }
}
