import { Article } from "./article";
import { Either } from "../../shared/either";
import { ID } from "../../shared/id";
import { ArticleNotFound } from "./article_not_found_error";
import { Pagination } from "../../shared/pagination";

export interface ArticleRepository {
    getAll(articles: ID[]): Promise<Either<ArticleNotFound, Article[]>>;
    getById(articleId: ID): Promise<Article>;
    updateStock(articles: Article[]): Promise<void>;
    list(pageToken: number, perPage?: number): Promise<Pagination<Article>>;
    search(query: string): Promise<Article[]>;
}
