import type { ItemModel } from "@frontend/models/item";
import type { VariationModel } from "@frontend/models/variation";
import type { CategoryModel } from "@frontend/models/category";
import type { SectionModel } from "@frontend/models/section";
import { useAuth } from "@app/composables/useAuth";

const auth = useAuth();

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
            headers: await this.#headers(),
        });

        return { items: response.items, total: response.total };
    }

    async listVariations(): Promise<VariationModel[]> {
        const variations = await $fetch("/api/variations", {
            method: "get",
            headers: await this.#headers(),
        });
        return variations;
    }

    async listCategories(): Promise<CategoryModel[]> {
        const categories = await $fetch("/api/categories", {
            method: "get",
            headers: await this.#headers(),
        });
        return categories;
    }

    async listSections(): Promise<SectionModel[]> {
        const sections = await $fetch("/api/sections", {
            method: "get",
            headers: await this.#headers(),
        });
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
            headers: await this.#headers(),
        });

        return { items: response.items, total: response.total };
    }

    async getItem(itemId: string): Promise<ItemModel> {
        const item = await $fetch(`/api/items/${itemId}`, {
            method: "get",
            headers: await this.#headers(),
        });
        return this.#toItemModel(item);
    }

    async registerItem(data: ItemDTO) {
        return await $fetch("/api/items", {
            method: "post",
            body: data,
            headers: await this.#headers(),
        });
    }

    async updateItem(itemId: string, data: ItemDTO) {
        return await $fetch(`/api/items/${itemId}`, {
            method: "post",
            body: data,
            headers: await this.#headers(),
        });
    }

    async registerCategory(name: string, variationsIds: string[], description?: string) {
        const data = { name, variationsIds, description };
        return await $fetch("/api/categories", {
            method: "post",
            body: data,
            headers: await this.#headers(),
        });
    }

    async #headers() {
        return {
            "X-Access-Token": await auth.getAccessToken(),
        };
    }

    #toItemModel(data: any): ItemModel {
        return {
            itemId: data.itemId,
            name: data.name,
            price: data.price,
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
