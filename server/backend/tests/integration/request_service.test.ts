import { describe, expect, it, vi } from "vitest";
import { FakePurposeSource } from "../purpose_source_fake";
import { PurposeSourceStub } from "../purpose_source_stub";
import { RequestService } from "../../application/request_service";
import { ID } from "../../shared/id";
import { InmemRequestRepository } from "../../persistense/inmem/inmem_request_repository";
import { ArticleRepositoryStub } from "../stubs/article_repository_stub";
import { InmemArticleRepository } from "../../persistense/inmem/inmem_article_repository";
import { ArticleNotFound } from "../../domain/articles/article_not_found_error";
import { InvalidTotal } from "../../domain/requests/invalid_total_error";
import { StockInsufficient } from "../../domain/articles/stock_insufficient";

describe("Test main Service", () => {
    it("should be return an  list void of purposes", async () => {
        const purposeSource = new FakePurposeSource();
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        const purposes = await service.listPurposes();

        expect(purposes).toEqual([]);
    });

    it("should be call list method in source data", async () => {
        const purposeSource = new FakePurposeSource();
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);
        const spy = vi.spyOn(purposeSource, "list");

        await service.listPurposes();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should retrieve a list of purposes from data", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        const purposes = await service.listPurposes();

        expect(purposes.length).toBeGreaterThanOrEqual(1);
        expect(purposes[0].name).toEqual("Lavandaria");
        expect(purposes[0].sections).toEqual(["Interna", "Externa"]);
    });

    it("should retrieve a purpose without sections", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        const purposes = await service.listPurposes();

        expect(purposes.length).toBeGreaterThanOrEqual(2);
        expect(purposes[1].name).toEqual("Arranjo");
        expect(purposes[1].sections).toBeUndefined();
    });
});

describe("Test RequestArticles Service", () => {
    it("Deve chamar o método **find** para encontrar a finalidade", () => {
        const purposeName = "Aluguer";
        const articlesData = [{ articleId: "1001", quantity: 1 }];
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);
        const spy = vi.spyOn(purposeSource, "find");

        service.requestArticles({ ...requestArticlesData, purposeName, articlesData });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(purposeName);
    });

    it("Deve retornar error **PurposeNotFound** se não existir", async () => {
        const purposeName = "Aluguer";
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        const voidOrError = await service.requestArticles({ ...requestArticlesData, purposeName });

        expect(voidOrError.isLeft()).toBeTruthy();
    });

    it("Deve chamar o método **findById** no repositório de artigos", async () => {
        const articlesData = [{ articleId: "1001", quantity: 1 }];
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new InmemArticleRepository();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);
        const artSpy = vi.spyOn(articleRepository, "getAll");

        await service.requestArticles({ ...requestArticlesData, articlesData });

        expect(artSpy).toHaveBeenCalled();
        expect(artSpy).toHaveBeenCalledTimes(1);
        expect(artSpy).toHaveBeenCalledWith([ID.New("1001")]);
    });

    it("Deve retornar um erro **ArticleNotFound** se não existir", async () => {
        const articlesData = [{ articleId: "1008", quantity: 1 }];
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        const voidOrError = await service.requestArticles({
            ...requestArticlesData,
            articlesData,
        });

        expect(voidOrError.isLeft()).toBeTruthy();
        expect(voidOrError.value).toBeInstanceOf(ArticleNotFound);
    });

    it("Deve chamar o método **save** no repositório de solicitações de artigos", async () => {
        const articlesData = [{ articleId: "1001", quantity: 1 }];
        const requestTotal = "10,00";
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);
        const spy = vi.spyOn(requestRepository, "save");

        await service.requestArticles({
            ...requestArticlesData,
            articlesData,
            requestTotal,
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve efectuar a solicitação de um uníco artigo", async () => {
        const articlesData = [{ articleId: "1001", quantity: 1 }];
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        const er = await service.requestArticles({
            ...requestArticlesData,
            articlesData,
            requestTotal: "10,00",
        });

        const requestArticles = await requestRepository.last();
        const requestedItem = requestArticles.requestedItems[0];

        expect(requestArticles.requestedItems.length).toBe(1);
        expect(requestedItem.article.articleId.toString()).toEqual("1001");
        expect(requestedItem.getTotal().value).toEqual("10,00");
        expect(requestedItem.quantity).toEqual(1);
    });

    it("Deve efectuar a solicitação de mais de um artigo", async () => {
        const purposeSource = new PurposeSourceStub();
        const articlesData = [
            { articleId: "1001", quantity: 1 },
            { articleId: "1002", quantity: 1 },
        ];
        const requestTotal = "25,95";
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        await service.requestArticles({
            ...requestArticlesData,
            articlesData,
            requestTotal,
        });

        const requestArticles = await requestRepository.last();
        expect(requestArticles.requestedItems.length).toBe(2);
        expect(requestArticles.getTotal().value).toEqual(requestTotal);
    });

    it("Deve verificar se o calculo do total a pagar da solicitação é igual ao total enviado pelo solicitante", async () => {
        const articlesData = [
            { articleId: "1001", quantity: 1 },
            { articleId: "1002", quantity: 1 },
        ];
        const requestTotal = "25,95";
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        await service.requestArticles({
            ...requestArticlesData,
            articlesData,
            requestTotal,
        });

        const requestArticles = await requestRepository.last();

        expect(requestArticles.isSameTotal(requestTotal)).toBeTruthy();
    });

    it("Deve retornar **InvalidTotal** se o total enviado pelo solicitante for diferente do total a pagar da solicitação", async () => {
        const requestTotal = "25,00";
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        const voidOrError = await service.requestArticles({ ...requestArticlesData, requestTotal });

        expect(voidOrError.isLeft()).toBeTruthy();
        expect(voidOrError.value).toBeInstanceOf(InvalidTotal);
    });

    it("Deve registrar a data de devolução da solicitação", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        await service.requestArticles(requestArticlesData);

        const requestArticles = await requestRepository.last();

        expect(requestArticles.returnDate).toBeDefined();
        expect(requestArticles.returnDate).toBeInstanceOf(Date);
    });

    it("Deve solicitar vários artigos com diferentes quantidades", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        await service.requestArticles({ ...requestArticlesData, requestTotal: "67,85" });

        const requestArticles = await requestRepository.last();

        expect(requestArticles.requestedItems.length).toBe(2);
        expect(requestArticles.getTotal().value).toEqual("67,85");
    });

    it("Deve retornar **StockInsufficient** se a quantidade solicitada for maior que a quantidade em estoque", async () => {
        const articlesData = [
            { articleId: "1001", quantity: 10 },
            { articleId: "1002", quantity: 15 },
        ];

        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const purposeSource = new PurposeSourceStub();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        const voidOrError = await service.requestArticles({ ...requestArticlesData, articlesData });

        expect(voidOrError.isLeft()).toBeTruthy();
        expect(voidOrError.value).toBeInstanceOf(StockInsufficient);
    });

    it("Deve atualizar o estoque dos artigos solicitados no repositório", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);
        const spy = vi.spyOn(articleRepository, "updateStock");

        await service.requestArticles(requestArticlesData);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve diminuir o estoque dos artigos solicitados", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        await service.requestArticles(requestArticlesData);

        const article = await articleRepository.getById(ID.New("1001"));

        expect(article.getStock()).toEqual(8);
    });
});

describe("Test ListArticles", () => {
    it("Deve chamar o método **list** no repositório de artigos", async () => {
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const purposeSource = new PurposeSourceStub();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);
        const spy = vi.spyOn(articleRepository, "list");

        await service.listArticles();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve buscar os artigos no repositório", async () => {
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const purposeSource = new PurposeSourceStub();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        const articles = await service.listArticles();

        expect(articles.length).toBeGreaterThanOrEqual(2);
        expect(articles[0].articleId.toString()).toEqual("1001");
    });

    it("Deve retornar um array vazio se não existir artigos", async () => {
        const articleRepository = new InmemArticleRepository();
        const requestRepository = new InmemRequestRepository();
        const purposeSource = new PurposeSourceStub();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        const articles = await service.listArticles();

        expect(articles).toEqual([]);
    });
});

describe("Test SearchArticles", () => {
    it("Deve chamar o método **search** no repositório de artigos", async () => {
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const purposeSource = new PurposeSourceStub();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);
        const spy = vi.spyOn(articleRepository, "search");

        await service.searchArticles("Teste");

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith("Teste");
    });

    it("Deve pesquisar o artigo pelo seu nome", async () => {
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const purposeSource = new PurposeSourceStub();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        const articles = await service.searchArticles("Teste");

        expect(articles.length).toBeGreaterThanOrEqual(2);
        expect(articles[0].articleId.toString()).toEqual("1001");
    });

    it("Deve pesquisar o artigo pelo seu identificador", async () => {
        const articleRepository = new ArticleRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const purposeSource = new PurposeSourceStub();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        const articles = await service.searchArticles("1002");

        expect(articles.length).toBeGreaterThanOrEqual(1);
        expect(articles[0].articleId.toString()).toEqual("1002");
    });

    it("Deve retornar um array vazio se não existir artigos", async () => {
        const articleRepository = new InmemArticleRepository();
        const requestRepository = new InmemRequestRepository();
        const purposeSource = new PurposeSourceStub();
        const service = new RequestService(purposeSource, articleRepository, requestRepository);

        const articles = await service.searchArticles("Teste");

        expect(articles).toEqual([]);
    });
});

const requestArticlesData = {
    purposeName: "Lavandaria",
    articlesData: [
        { articleId: "1001", quantity: 2 },
        { articleId: "1002", quantity: 3 },
    ],
    requestTotal: "67,85",
    returnDate: "2021-01-01T16:40:00",
};
