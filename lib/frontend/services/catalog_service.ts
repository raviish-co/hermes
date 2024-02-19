import type { ItemModel } from "@frontend/models/item";
import type { VariationModel } from "@frontend/models/variation";

export class CatalogService {
    async searchItems(
        query: string,
        pageToken: number = 1,
        perPage: number = 8
    ): Promise<{ items: ItemModel[]; total: number }> {
        const response = await $fetch(
            `/api/search-items?query=${query}&pageToken=${pageToken}&perPage=${perPage}`,
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
