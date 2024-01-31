import { Product } from "../domain/catalog/product";
import { ItemRepository } from "../domain/catalog/item_repository";
import { Pagination } from "../shared/pagination";

export class ArticleService {
    readonly articleRepository: ItemRepository;

    constructor(articleRepository: ItemRepository) {
        this.articleRepository = articleRepository;
    }

    async listArticles(pageToken: number = 1, perPage: number = 12): Promise<Pagination<Product>> {
        return await this.articleRepository.list(pageToken, perPage);
    }

    searchArticles(
        query: string,
        pageToken: number = 1,
        perPage: number = 12
    ): Promise<Pagination<Product>> {
        return this.articleRepository.search(query, pageToken, perPage);
    }
}
