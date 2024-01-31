import { Product } from "../domain/products/product";
import { ItemRepository } from "../domain/products/item_repository";
import { Pagination } from "../shared/pagination";

export class ArticleService {
    readonly articleRepository: ItemRepository;

    constructor(articleRepository: ItemRepository) {
        this.articleRepository = articleRepository;
    }

    async listArticles(pageToken: number = 1, perPage: number = 12): Promise<Pagination<Article>> {
        const x = await this.articleRepository.list(pageToken, perPage);
        console.log(x);
        return x;
    }

    searchArticles(
        query: string,
        pageToken: number = 1,
        perPage: number = 12
    ): Promise<Pagination<Product>> {
        return this.articleRepository.search(query, pageToken, perPage);
    }
}
