import type { VariationModel } from "@frontend/models/variation";
import type { CategoryModel } from "../models/category";
import type { ItemModel } from "@frontend/models/item";

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

    async registerItem(data: RegisterItemDTO): Promise<void> {
        await $fetch("/api/items", { method: "post", body: data });
    }

    async listVariations(): Promise<VariationModel[]> {
        const variations = await $fetch("/api/variations", { method: "get" });
        return variations;
    }

    async listCategories(): Promise<CategoryModel[]> {
        return [
            { categoryId: "1", name: "Boca", variationsIds: ["1", "2"] },
            { categoryId: "2", name: "Pele", variationsIds: ["1", "2"] },
            { categoryId: "3", name: "Olhos", variationsIds: ["1", "2"] },
        ];
    }
}

interface RegisterItemDTO {
    name: string;
    price: number;
    comment?: string;
    categoryId?: string;
    variations?: VariationDTO[];
}

interface VariationDTO {
    variationId: string;
    name: string;
    value: string;
}
