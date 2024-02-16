import { ItemRepository } from "../domain/catalog/item_repository";
import { Variation } from "../domain/catalog/variation";
import { ItemCategory } from "../domain/catalog/item";
import { Pagination } from "../shared/pagination";

export interface VariationRepository {
    save(variation: Variation): Promise<void>;
    getVariations(): Promise<Variation[]>;
}

export class CatalogService {
    #itemRepository: ItemRepository;
    #variationRepository: VariationRepository;

    constructor(itemRepository: ItemRepository, variationRepository: VariationRepository) {
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
