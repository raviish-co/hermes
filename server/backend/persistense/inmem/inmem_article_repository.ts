import { Article } from "../../domain/articles/article";
import { Either, right } from "../../shared/either";
import { ID } from "../../shared/id";
import { ArticleNotFound } from "../../domain/articles/article_not_found_error";
import { ArticleRepository } from "../../domain/articles/article_repository";

export class InmemArticleRepository implements ArticleRepository {
    getAll(_articles: ID[]): Promise<Either<ArticleNotFound, Article[]>> {
        const article = Article.create({
            articleId: "1001",
            title: "Teste",
            price: "10",
            condition: { status: "Bom" },
            securityDeposit: "100",
        });
        return Promise.resolve(right([article]));
    }
}
