import { ItemRepository } from "../domain/catalog/item_repository";
import { Pagination } from "../shared/pagination";
import { Item } from "../domain/catalog/item";

export class CatalogService {
    #itemRepository: ItemRepository;

    constructor(itemRepository: ItemRepository) {
        this.#itemRepository = itemRepository;
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
}
