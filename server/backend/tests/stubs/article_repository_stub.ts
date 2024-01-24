import { Article, ArticleStatus } from "../../domain/articles/article";
import { Either, left, right } from "../../shared/either";
import { ID } from "../../shared/id";
import { ArticleNotFound } from "../../domain/articles/article_not_found_error";
import { ArticleRepository } from "../../domain/articles/article_repository";

export class ArticleRepositoryStub implements ArticleRepository {
    #data: Record<string, Article> = {};

    constructor() {
        this.#populate();
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

    list(): Promise<Article[]> {
        return Promise.resolve(this.records);
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

    #populate() {
        this.#data = {
            "1001": Article.create({
                articleId: "1001",
                title: "Teste",
                price: "10,00",
                condition: { status: ArticleStatus.Good },
                securityDeposit: "100",
            }),
            "1002": Article.create({
                articleId: "1002",
                title: "Teste 2",
                price: "15,95",
                condition: { status: ArticleStatus.Good },
                securityDeposit: "150",
            }),
        };
    }
}
