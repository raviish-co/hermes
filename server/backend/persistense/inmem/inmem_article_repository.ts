import { Article } from "../../domain/articles/article";
import { Either, left, right } from "../../shared/either";
import { ID } from "../../shared/id";
import { ArticleNotFound } from "../../domain/articles/article_not_found_error";
import { ArticleRepository } from "../../domain/articles/article_repository";
import { Pagination } from "../../shared/pagination";

export class InmemArticleRepository implements ArticleRepository {
    #data: Record<string, Article> = {};

    constructor() {
        this.#data = {};
    }

    getById(articleId: ID): Promise<Article> {
        return Promise.resolve(this.#data[articleId.toString()]);
    }

    getAll(identifiers: ID[]): Promise<Either<ArticleNotFound, Article[]>> {
        let articles: Article[] = [];
        for (const id of identifiers) {
            const article = this.records.find((a) => a.articleId.toString() === id.toString());
            if (!article) return Promise.resolve(left(new ArticleNotFound(id.toString())));
            articles.push(article);
        }

        return Promise.resolve(right(articles));
    }

    updateStock(articles: Article[]): Promise<void> {
        for (const article of articles) {
            this.#data[article.articleId.toString()] = article;
        }
        return Promise.resolve(undefined);
    }

    list(pageToken: number, perPage?: number): Promise<Pagination<Article>> {
        const size = perPage ? perPage : 12;
        const startIndex = (pageToken - 1) * size;

        const endIndex = startIndex + size;

        const result = this.records.slice(startIndex, endIndex);

        const total = Math.ceil(result.length / 12);

        return Promise.resolve({
            result,
            perPage: size,
            pageToken,
            total,
        });
    }

    search(query: string): Promise<Article[]> {
        const articles = this.records.filter((a) => {
            return a.title.includes(query) || a.articleId.toString().includes(query);
        });

        return Promise.resolve(articles);
    }

    get records(): Article[] {
        return Object.values(this.#data);
    }
}
