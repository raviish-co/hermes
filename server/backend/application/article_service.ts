import { Article } from "../domain/articles/article";
import { ArticleRepository } from "../domain/articles/article_repository";
import { Pagination } from "../shared/pagination";

export class ArticleService {
    readonly articleRepository: ArticleRepository;

    constructor(articleRepository: ArticleRepository) {
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
    ): Promise<Pagination<Article>> {
        return this.articleRepository.search(query, pageToken, perPage);
    }
}
