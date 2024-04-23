import type { VariationModel } from "@frontend/models/variation";
import type { CategoryModel } from "../models/category";
import type { ItemModel } from "@frontend/models/item";
import type { SectionModel } from "../models/section";

export class CatalogService {
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

    async listVariations(): Promise<VariationModel[]> {
        const variations = await $fetch("/api/variations", { method: "get" });
        return variations;
    }

    async listCategories(): Promise<CategoryModel[]> {
        const categories = await $fetch("/api/categories", { method: "get" });
        return categories;
    }

    async listSections(): Promise<SectionModel[]> {
        const sections = await $fetch("/api/sections", { method: "get" });
        return sections;
    }

    async searchItems(
        query: string,
        pageToken: number = 1,
        perPage: number = 8
    ): Promise<{ items: ItemModel[]; total: number }> {
        const response = await $fetch("/api/items/search", {
            method: "get",
            query: {
                query,
                pageToken,
                perPage,
            },
        });

        return { items: response.items, total: response.total };
    }

    async getItem(itemId: string): Promise<ItemModel> {
        const item = await $fetch(`/api/items/${itemId}`, { method: "get" });
        return this.#toItemModel(item);
    }

    async registerItem(data: ItemDTO) {
        return await $fetch("/api/items", { method: "post", body: data });
    }

    async updateItem(itemId: string, data: ItemDTO) {
        return await $fetch(`/api/items/${itemId}`, {
            method: "post",
            body: data,
        });
    }

    async registerCategory(name: string, variationsIds: string[], description?: string) {
        const data = { name, variationsIds, description };
        return await $fetch("/api/categories", { method: "post", body: data });
    }

    #toItemModel(data: any): ItemModel {
        return {
            itemId: data.itemId,
            name: data.name,
            price: data.price,
            stock: data.stock,
            condition: data.condition,
            categoryId: data.categoryId,
            sectionId: data.sectionId,
            variationsValues: data.variationsValues,
            tags: data.tags,
        };
    }
}

interface ItemDTO {
    name: string;
    price: number;
    categoryId?: string;
    sectionId?: string;
    variations?: VariationDTO[];
    comment?: string;
    tags?: string[];
}

interface VariationDTO {
    variationId: string;
    name: string;
    value: string;
}
