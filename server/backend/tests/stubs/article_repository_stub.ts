import { Article } from "../../domain/articles/article";
import { Either, left, right } from "../../shared/either";
import { ID } from "../../shared/id";
import { ArticleNotFound } from "../../domain/articles/article_not_found_error";
import { ArticleRepository } from "../../domain/articles/article_repository";

export class ArticleRepositoryStub implements ArticleRepository {
    #data: Record<string, Article> = {};

    constructor() {
        this.#data = {
            "1001": Article.create({
                articleId: "1001",
                title: "Teste",
                price: "10,00",
                condition: { status: "Bom" },
                securityDeposit: "100",
            }),
            "1002": Article.create({
                articleId: "1002",
                title: "Teste 2",
                price: "15,95",
                condition: { status: "Bom" },
                securityDeposit: "150",
            }),
        };
    }

    getAll(ids: ID[]): Promise<Either<ArticleNotFound, Article[]>> {
        let articles: Article[] = [];
        for (const id of ids) {
            const article = this.records.find((a) => a.articleId.toString() === id.toString());
            if (!article) return Promise.resolve(left(new ArticleNotFound(id.toString())));
            articles.push(article);
        }

        return Promise.resolve(right(articles));
    }

    get records(): Article[] {
        return Object.values(this.#data);
    }
}
