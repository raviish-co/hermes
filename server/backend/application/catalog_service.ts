import { CategoryRepository } from "../domain/catalog/category_repository";
import { ItemRepository } from "../domain/catalog/item_repository";
import { Pagination } from "../shared/pagination";
import { Item } from "../domain/catalog/item";
import { Category } from "../domain/catalog/section";

export class CatalogService {
    #itemRepository: ItemRepository;
    #categoryRepository: CategoryRepository;

    constructor(itemRepository: ItemRepository, categoryRepository: CategoryRepository) {
        this.#itemRepository = itemRepository;
        this.#categoryRepository = categoryRepository;
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

    async getCategories(): Promise<Category[]> {
        return this.#categoryRepository.getAll();
    }
}
