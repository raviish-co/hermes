import { InmemItemRepository } from "../../persistense/inmem/inmem_article_repository";
import { ArticleService } from "../../application/article_service";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import { describe, it, vi, expect } from "vitest";

describe("Test ListArticles", () => {
    it("Deve chamar o método **list** no repositório de artigos", async () => {
        const articleRepository = new ItemRepositoryStub();
        const service = new ArticleService(articleRepository);
        const spy = vi.spyOn(articleRepository, "list");

        await service.listArticles();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve buscar os artigos no repositório", async () => {
        const articleRepository = new ItemRepositoryStub();
        const service = new ArticleService(articleRepository);

        const { result: articles } = await service.listArticles();

        expect(articles.length).toBeGreaterThanOrEqual(2);
        expect(articles[0].productId.toString()).toEqual("1001");
    });

    it("Deve retornar um array vazio se não existir artigos", async () => {
        const articleRepository = new InmemItemRepository();
        const service = new ArticleService(articleRepository);

        const { result: articles } = await service.listArticles();

        expect(articles).toEqual([]);
    });
});

describe("Test SearchArticles", () => {
    it("Deve chamar o método **search** no repositório de artigos", async () => {
        const articleRepository = new ItemRepositoryStub();
        const service = new ArticleService(articleRepository);
        const spy = vi.spyOn(articleRepository, "search");

        await service.searchArticles("Teste");

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith("Teste", 1, 12);
    });

    it("Deve pesquisar o artigo pelo seu nome", async () => {
        const articleRepository = new ItemRepositoryStub();
        const service = new ArticleService(articleRepository);

        const { result: articles } = await service.searchArticles("Teste");

        expect(articles.length).toBeGreaterThanOrEqual(2);
        expect(articles[0].productId.toString()).toEqual("1001");
    });

    it("Deve pesquisar o artigo pelo seu identificador", async () => {
        const articleRepository = new ItemRepositoryStub();
        const service = new ArticleService(articleRepository);

        const { result: articles } = await service.searchArticles("1002");

        expect(articles.length).toBeGreaterThanOrEqual(1);
        expect(articles[0].productId.toString()).toEqual("1002");
    });

    it("Deve retornar um array vazio se não existir artigos", async () => {
        const articleRepository = new InmemItemRepository();
        const service = new ArticleService(articleRepository);

        const { result: articles } = await service.searchArticles("Teste");

        expect(articles).toEqual([]);
    });

    it("Deve paginar o resultado da listagem de artigos por 12 artigos por página", async () => {
        const articleRepository = new ItemRepositoryStub();
        const service = new ArticleService(articleRepository);

        const articles = await service.listArticles();

        expect(articles.result.length).toEqual(2);
        expect(articles.pageToken).toEqual(1);
        expect(articles.perPage).toEqual(12);
    });

    it("Deve buscar os artigos pela página", async () => {
        const pageToken = 2;
        const articleRepository = new ItemRepositoryStub();
        const service = new ArticleService(articleRepository);

        const articles = await service.listArticles(pageToken);

        expect(articles.result.length).toEqual(0);
        expect(articles.pageToken).toEqual(2);
        expect(articles.perPage).toEqual(12);
    });

    it("Deve buscar por um tamanho de página diferente de 12", async () => {
        const pageToken = 1;
        const perPage = 30;
        const articleRepository = new ItemRepositoryStub();
        const service = new ArticleService(articleRepository);

        const articles = await service.listArticles(pageToken, perPage);

        expect(articles.result.length).toEqual(2);
        expect(articles.pageToken).toEqual(1);
        expect(articles.perPage).toEqual(perPage);
    });

    it("Deve paginar o resultado da pesquisa de artigos por 12 artigos por página", async () => {
        const articleRepository = new ItemRepositoryStub();
        const service = new ArticleService(articleRepository);

        const articles = await service.searchArticles("Teste");

        expect(articles.result.length).toEqual(2);
        expect(articles.pageToken).toEqual(1);
        expect(articles.perPage).toEqual(12);
    });

    it("Deve paginar o resultado da pesquisa por um tamanho de página diferente de 12", async () => {
        const perPage = 30;
        const articleRepository = new ItemRepositoryStub();
        const service = new ArticleService(articleRepository);

        const articles = await service.searchArticles("Teste", 1, perPage);

        expect(articles.result.length).toEqual(2);
        expect(articles.pageToken).toEqual(1);
        expect(articles.perPage).toEqual(perPage);
    });

    it("Deve paginar o resultado da pesquisa pelo número da página", async () => {
        const pageToken = 2;
        const articleRepository = new ItemRepositoryStub();
        const service = new ArticleService(articleRepository);

        const articles = await service.searchArticles("Teste", pageToken, 12);

        expect(articles.result.length).toEqual(0);
        expect(articles.pageToken).toEqual(2);
        expect(articles.perPage).toEqual(12);
    });
});
