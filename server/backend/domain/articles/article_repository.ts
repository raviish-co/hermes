import { Article } from "./article";
import { Either } from "../../shared/either";
import { ID } from "../../shared/id";
import { ArticleNotFound } from "./article_not_found_error";

export interface ArticleRepository {
    getAll(articles: ID[]): Promise<Either<ArticleNotFound, Article[]>>;
}
