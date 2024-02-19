import type { ItemCategoryRepository } from "@backend/domain/catalog/item_category_repository";
import type { VariationRepository } from "@backend/domain/catalog/variation_repository";
import { ItemCategory } from "~/lib/backend/domain/catalog/item_category";
import { Variation } from "@backend/domain/catalog/variation";
import type { Pagination } from "@backend/shared/pagination";

export class CatalogService {
    #itemRepository: ItemCategoryRepository;
    #variationRepository: VariationRepository;

    constructor(itemRepository: ItemCategoryRepository, variationRepository: VariationRepository) {
        this.#itemRepository = itemRepository;
        this.#variationRepository = variationRepository;
    }

    async listItems(
        pageToken: number = 1,
        perPage: number = 12
    ): Promise<Pagination<ItemCategory>> {
        return await this.#itemRepository.list(pageToken, perPage);
    }

    async searchItems(
        query: string,
        pageToken: number = 1,
        perPage: number = 12
    ): Promise<Pagination<ItemCategory>> {
        return await this.#itemRepository.search(query, pageToken, perPage);
    }

    async getVariations(): Promise<Variation[]> {
        return await this.#variationRepository.getVariations();
    }
}
