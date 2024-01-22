import { describe, expect, it, vi } from "vitest";
import { FakePurposeSource } from "../purpose_source_fake";
import { PurposeSourceStub } from "../purpose_source_stub";
import { Service } from "../../application/service";
import { Article } from "../../domain/article";
import { Either, left, right } from "../../shared/either";
import { RequestArticles } from "../../domain/request_articles";

describe("Test main Service", () => {
    it("should be return an  list void of purposes", async () => {
        const purposeSource = new FakePurposeSource();
        const articleRepository = new ArticleRepositoryStub();
        const requestArticleRepository = new InmemRequestArticlesRepository();
        const service = new Service(purposeSource, articleRepository, requestArticleRepository);

        const purposes = await service.listPurposes();

        expect(purposes).toEqual([]);
    });

    it("should be call list method in source data", async () => {
        const purposeSource = new FakePurposeSource();
        const articleRepository = new ArticleRepositoryStub();
        const requestArticleRepository = new InmemRequestArticlesRepository();
        const service = new Service(purposeSource, articleRepository, requestArticleRepository);
        const spy = vi.spyOn(purposeSource, "list");

        await service.listPurposes();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should retrieve a list of purposes from data", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestArticleRepository = new InmemRequestArticlesRepository();
        const service = new Service(purposeSource, articleRepository, requestArticleRepository);

        const purposes = await service.listPurposes();

        expect(purposes.length).toBeGreaterThanOrEqual(1);
        expect(purposes[0].name).toEqual("Lavandaria");
        expect(purposes[0].sections).toEqual(["Interna", "Externa"]);
    });

    it("should retrieve a purpose without sections", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestArticleRepository = new InmemRequestArticlesRepository();
        const service = new Service(purposeSource, articleRepository, requestArticleRepository);

        const purposes = await service.listPurposes();

        expect(purposes.length).toBeGreaterThanOrEqual(2);
        expect(purposes[1].name).toEqual("Arranjo");
        expect(purposes[1].sections).toBeUndefined();
    });
});

export class ArticleNotFound extends Error {
    constructor(articleId: string) {
        super(`Article ${articleId} not found`);
    }
}

export interface ArticleRepository {
    getAll(articles: ID[]): Promise<Either<ArticleNotFound, Article[]>>;
}

export interface RequestArticlesRepository {
    save(requestArticles: RequestArticles): Promise<void>;
    last(): Promise<RequestArticles>;
}

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

export class ArticleRepositoryStub implements ArticleRepository {
    #data: Record<string, Article> = {};

    constructor() {
        this.#data = {
            "1001": Article.create({
                articleId: "1001",
                title: "Teste",
                price: "10,05",
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
            console.log(id.toString());
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

export class InmemRequestArticlesRepository implements RequestArticlesRepository {
    #data: Record<string, RequestArticles> = {};

    save(requestArticles: RequestArticles): Promise<void> {
        this.#data["1000"] = requestArticles;
        return Promise.resolve(undefined);
    }

    last(): Promise<RequestArticles> {
        console.log(this.records);
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): RequestArticles[] {
        return Object.values(this.#data);
    }
}

export class ID {
    #value: string;

    private constructor(raw: string) {
        this.#value = raw;
    }

    static New(raw: string): ID {
        return new ID(raw);
    }

    toString(): string {
        return this.#value;
    }
}

describe("Test RequestArticles Service", () => {
    it("Deve chamar o método **find** para encontrar a finalidade", () => {
        const purpose = "Aluguer";
        const articles = ["1001"];
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestArticleRepository = new InmemRequestArticlesRepository();
        const service = new Service(purposeSource, articleRepository, requestArticleRepository);
        const spy = vi.spyOn(purposeSource, "find");

        service.newRequestArticles(purpose, articles);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(purpose);
    });

    it("Deve retornar error **PurposeNotFound** se não existir", async () => {
        const articles = ["1001"];
        const purpose = "Aluguer";
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestArticleRepository = new InmemRequestArticlesRepository();
        const service = new Service(purposeSource, articleRepository, requestArticleRepository);

        const voidOrError = await service.newRequestArticles(purpose, articles);

        expect(voidOrError.isLeft()).toBeTruthy();
    });

    it("Deve chamar o método **findById** no repositório de artigos", async () => {
        const purpose = "Lavandaria";
        const articles = ["1001"];
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new InmemArticleRepository();
        const requestArticleRepository = new InmemRequestArticlesRepository();
        const service = new Service(purposeSource, articleRepository, requestArticleRepository);
        const artSpy = vi.spyOn(articleRepository, "getAll");

        await service.newRequestArticles(purpose, articles);

        expect(artSpy).toHaveBeenCalled();
        expect(artSpy).toHaveBeenCalledTimes(1);
        expect(artSpy).toHaveBeenCalledWith([ID.New("1001")]);
    });

    it("Deve retornar um erro **ArticleNotFound** se não existir", async () => {
        const purpose = "Lavandaria";
        const articles = ["1008"];
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestArticleRepository = new InmemRequestArticlesRepository();
        const service = new Service(purposeSource, articleRepository, requestArticleRepository);

        const voidOrError = await service.newRequestArticles(purpose, articles);

        expect(voidOrError.isLeft()).toBeTruthy();
        expect(voidOrError.value).toBeInstanceOf(ArticleNotFound);
    });

    it("Deve chamar o método **save** no repositório de solicitações de artigos", async () => {
        const purpose = "Lavandaria";
        const articles = ["1001"];
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new InmemArticleRepository();
        const requestArticleRepository = new InmemRequestArticlesRepository();
        const service = new Service(purposeSource, articleRepository, requestArticleRepository);
        const spy = vi.spyOn(requestArticleRepository, "save");

        await service.newRequestArticles(purpose, articles);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve efectuar a solicitação de um uníco artigo", async () => {
        const purpose = "Lavandaria";
        const articles = ["1001"];
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new InmemArticleRepository();
        const requestArticlesRepository = new InmemRequestArticlesRepository();
        const service = new Service(purposeSource, articleRepository, requestArticlesRepository);

        await service.newRequestArticles(purpose, articles);

        const requestArticles = await requestArticlesRepository.last();
        const requestLine = requestArticles.requestLines[0];

        expect(requestArticles.requestLines.length).toBe(1);
        expect(requestLine.article.articleId.toString()).toEqual("1001");
        expect(requestLine.getTotal().value).toEqual("10");
        expect(requestLine.quantity).toEqual(1);
    });

    it("Deve efectuar a solicitação de mais de um artigo", async () => {
        const articles = ["1001", "1002"];
        const purpose = "Lavandaria";
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestArticlesRepository = new InmemRequestArticlesRepository();
        const service = new Service(purposeSource, articleRepository, requestArticlesRepository);

        await service.newRequestArticles(purpose, articles);

        const requestArticles = await requestArticlesRepository.last();
        expect(requestArticles.requestLines.length).toBe(2);
        expect(requestArticles.getTotal().value).toEqual("25,95");
    });
});
