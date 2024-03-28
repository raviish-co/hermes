import type { ItemModel } from "@frontend/models/item";
import type { VariationModel } from "@frontend/models/variation";

export class CatalogService {
    async searchItems(
        query: string,
        pageToken: number = 1,
        perPage: number = 8
    ): Promise<{ items: ItemModel[]; total: number }> {
        const response = await $fetch("/api/search-items", {
            method: "get",
            query: {
                query,
                pageToken,
                perPage,
            },
        });

        return { items: response.items, total: response.total };
    }

    async listItems(
        pageToken: number = 1,
        perPage: number = 8
    ): Promise<{ items: ItemModel[]; total: number }> {
        const response = await $fetch("/api/items", {
            method: "get",
            query: {
                pageToken,
                perPage,
            },
        });

        return { items: response.items, total: response.total };
    }

    async registerItem(name: string, price: number, comment?: string) {
        const data = { name, price, comment };
        await $fetch("/api/items", { method: "post", body: data });
    }

    async listVariations(): Promise<VariationModel[]> {
        const variations = await $fetch("/api/variations", { method: "get" });
        return variations;
    }
}
