import { Product } from "../domain/catalog/product";
import { ItemRepository } from "../domain/catalog/item_repository";
import { Pagination } from "../shared/pagination";

export class ArticleService {
    readonly itemRepository: ItemRepository;

    constructor(itemRepository: ItemRepository) {
        this.itemRepository = itemRepository;
    }

    async listArticles(pageToken: number = 1, perPage: number = 12): Promise<Pagination<Product>> {
        return await this.itemRepository.list(pageToken, perPage);
    }

    searchArticles(
        query: string,
        pageToken: number = 1,
        perPage: number = 12
    ): Promise<Pagination<Product>> {
        return this.itemRepository.search(query, pageToken, perPage);
    }
}
