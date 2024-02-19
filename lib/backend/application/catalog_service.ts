import type { ItemCategoryRepository } from "../domain/catalog/item_repository";
import type { VariationRepository } from "../domain/catalog/variation_repository";
import { Item } from "../domain/catalog/item";
import { Variation } from "../domain/catalog/variation";
import type { Pagination } from "../shared/pagination";

export class CatalogService {
    #itemRepository: ItemCategoryRepository;
    #variationRepository: VariationRepository;

    constructor(itemRepository: ItemCategoryRepository, variationRepository: VariationRepository) {
        this.#itemRepository = itemRepository;
        this.#variationRepository = variationRepository;
    }

    async listItems(pageToken: number = 1, perPage: number = 12): Promise<Pagination<Item>> {
        return await this.#itemRepository.list(pageToken, perPage);
    }

    async searchItems(
        query: string,
        pageToken: number = 1,
        perPage: number = 12
    ): Promise<Pagination<Item>> {
        return await this.#itemRepository.search(query, pageToken, perPage);
    }

    async getVariations(): Promise<Variation[]> {
        return await this.#variationRepository.getAll();
    }
}
