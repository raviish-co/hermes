import { InmemRequestRepository } from "../../persistense/inmem/inmem_request_repository";
import { InmemItemRepository } from "../../persistense/inmem/inmem_article_repository";
import { ProductNotFound } from "../../domain/catalog/product_not_found_error";
import { InsufficientStock } from "../../domain/insufficient_stock_error";
import { InvalidTotal } from "../../domain/requests/invalid_total_error";
import { StockRepositoryStub } from "../stubs/stock_repository_stub";
import { RequestService } from "../../application/request_service";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import { FakePurposeSource } from "../purpose_source_fake";
import { PurposeSourceStub } from "../purpose_source_stub";
import { describe, expect, it, vi } from "vitest";
import { ID } from "../../shared/id";

describe("Test Purpose Source", () => {
    it("should be return an  list void of purposes", async () => {
        const purposeSource = new FakePurposeSource();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );

        const purposes = await service.listPurposes();

        expect(purposes).toEqual([]);
    });

    it("should be call list method in source data", async () => {
        const purposeSource = new FakePurposeSource();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );
        const spy = vi.spyOn(purposeSource, "list");

        await service.listPurposes();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should retrieve a list of purposes from data", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );

        const purposes = await service.listPurposes();

        expect(purposes.length).toBeGreaterThanOrEqual(1);
        expect(purposes[0].name).toEqual("Lavandaria");
        expect(purposes[0].sections).toEqual(["Interna", "Externa"]);
    });

    it("should retrieve a purpose without sections", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );

        const purposes = await service.listPurposes();

        expect(purposes.length).toBeGreaterThanOrEqual(2);
        expect(purposes[1].name).toEqual("Arranjo");
        expect(purposes[1].sections).toBeUndefined();
    });
});

describe("Test RequestArticles Service", () => {
    it("Deve chamar o método **exists** para encontrar a finalidade", () => {
        const purposeName = "Aluguer";
        const articlesData = [{ articleId: "1001", quantity: 1 }];
        const data = {
            ...requestArticlesData,
            purposeData: {
                name: purposeName,
            },
            articlesData,
        };

        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );
        const spy = vi.spyOn(purposeSource, "exists");

        service.requestArticles(data);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(purposeName);
    });

    it("Deve retornar error **PurposeNotFound** se não existir", async () => {
        const data = {
            ...requestArticlesData,
            purposeData: { name: "Aluguer" },
        };
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );

        const voidOrError = await service.requestArticles(data);

        expect(voidOrError.isLeft()).toBeTruthy();
    });

    it("Deve chamar o método **getAll** no repositório de artigos", async () => {
        const productsData = [{ productId: "1001", quantity: 1 }];
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new InmemItemRepository();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );
        const artSpy = vi.spyOn(articleRepository, "getAll");

        await service.requestArticles({ ...requestArticlesData, productsData });

        expect(artSpy).toHaveBeenCalled();
        expect(artSpy).toHaveBeenCalledTimes(1);
        expect(artSpy).toHaveBeenCalledWith([{ productId: ID.New("1001"), variations: [] }]);
    });

    it("Deve retornar um erro **ArticleNotFound** se não existir", async () => {
        const productsData = [{ productId: "1008", quantity: 1 }];
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );

        const voidOrError = await service.requestArticles({
            ...requestArticlesData,
            productsData,
        });

        expect(voidOrError.isLeft()).toBeTruthy();
        expect(voidOrError.value).toBeInstanceOf(ProductNotFound);
    });

    it("Deve chamar o método **save** no repositório de solicitações de artigos", async () => {
        const productsData = [{ productId: "1001", quantity: 1 }];
        const requestTotal = "15,95";
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );
        const spy = vi.spyOn(requestRepository, "save");

        await service.requestArticles({
            ...requestArticlesData,
            productsData,
            requestTotal,
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve efectuar a solicitação de um uníco artigo", async () => {
        const productsData = [{ productId: "1001", quantity: 1 }];
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );

        await service.requestArticles({
            ...requestArticlesData,
            productsData,
            requestTotal: "15,95",
        });

        const requestArticles = await requestRepository.last();
        const requestedItem = requestArticles.items[0];

        expect(requestArticles.items.length).toBe(1);
        expect(requestedItem.item.product.productId.toString()).toEqual("1001");
        expect(requestedItem.getTotal().value).toEqual("15,95");
        expect(requestedItem.quantity).toEqual(1);
    });

    it("Deve efectuar a solicitação de mais de um artigo", async () => {
        const purposeSource = new PurposeSourceStub();
        const productsData = [
            { productId: "1001", quantity: 1 },
            { productId: "1002", quantity: 1 },
        ];
        const requestTotal = "166,90";
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );

        await service.requestArticles({
            ...requestArticlesData,
            productsData,
            requestTotal,
        });

        const requestArticles = await requestRepository.last();
        expect(requestArticles.items.length).toBe(2);
        expect(requestArticles.getTotal().value).toEqual(requestTotal);
    });

    it("Deve verificar se o calculo do total a pagar da solicitação é igual ao total enviado pelo solicitante", async () => {
        const productsData = [
            { productId: "1001", quantity: 1 },
            { productId: "1002", quantity: 1 },
        ];
        const requestTotal = "166,90";
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );

        await service.requestArticles({
            ...requestArticlesData,
            productsData,
            requestTotal,
        });

        const requestArticles = await requestRepository.last();

        expect(requestArticles.isSameTotal(requestTotal)).toBeTruthy();
    });

    it("Deve retornar **InvalidTotal** se o total enviado pelo solicitante for diferente do total a pagar da solicitação", async () => {
        const requestTotal = "25,00";
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );

        const voidOrError = await service.requestArticles({ ...requestArticlesData, requestTotal });

        expect(voidOrError.isLeft()).toBeTruthy();
        expect(voidOrError.value).toBeInstanceOf(InvalidTotal);
    });

    it("Deve registrar a data de devolução da solicitação", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );

        await service.requestArticles(requestArticlesData);

        const requestArticles = await requestRepository.last();

        expect(requestArticles.returnDate).toBeDefined();
        expect(requestArticles.returnDate).toBeInstanceOf(Date);
    });

    it("Deve solicitar vários artigos com diferentes quantidades", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );

        await service.requestArticles(requestArticlesData);

        const requestArticles = await requestRepository.last();

        expect(requestArticles.items.length).toBe(2);
        expect(requestArticles.getTotal().value).toEqual("484,75");
    });

    it("Deve retornar **InsufficientStock** se a quantidade solicitada for maior que a quantidade em estoque", async () => {
        const productsData = [
            { productId: "1001", quantity: 10 },
            { productId: "1002", quantity: 15 },
        ];

        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const purposeSource = new PurposeSourceStub();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );

        const voidOrError = await service.requestArticles({
            ...requestArticlesData,
            productsData,
        });

        expect(voidOrError.isLeft()).toBeTruthy();
        expect(voidOrError.value).toBeInstanceOf(InsufficientStock);
    });

    it.skip("Deve atualizar o estoque dos artigos solicitados no repositório", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );
        const spy = vi.spyOn(articleRepository, "updateStock");

        await service.requestArticles(requestArticlesData);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it.skip("Deve diminuir o estoque dos artigos solicitados", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );

        await service.requestArticles(requestArticlesData);

        const article = await articleRepository.getById(ID.New("1001"));

        expect(article.getStock()).toEqual(8);
    });

    it("Caso a finalidade tenha uma seção, deve ser adicionada a solicitação", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );

        await service.requestArticles(requestArticlesData);

        const requestArticles = await requestRepository.last();

        expect(requestArticles.purpose.section).toBeDefined();
        expect(requestArticles.purpose.section).toEqual("Interna");
    });

    it("Deve ser adicionada a solicitação caso a finalidade tenha um destino", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const data = {
            ...requestArticlesData,
            purposeData: {
                name: "Lavandaria",
                section: "Externa",
                recipient: "John Doe",
            },
        };

        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );

        await service.requestArticles(data);

        const requestArticles = await requestRepository.last();

        expect(requestArticles.purpose.recipient).toBeDefined();
        expect(requestArticles.purpose.recipient).toEqual("John Doe");
    });

    it("Deve retornar **InsufficientStock** se a quantidade solicitada de uma variação não tiver estoque suficiente", async () => {
        const purposeSource = new PurposeSourceStub();
        const articleRepository = new ItemRepositoryStub();
        const requestRepository = new InmemRequestRepository();
        const stockRepository = new StockRepositoryStub();
        const service = new RequestService(
            purposeSource,
            articleRepository,
            requestRepository,
            stockRepository
        );
        const productsData = [
            { productId: "1001", quantity: 2 },
            { productId: "1002", quantity: 3 },
            { productId: "1003", quantity: 4, variations: ["1004", "1005"] },
        ];

        const voidOrError = await service.requestArticles({
            ...requestArticlesData,
            productsData,
        });

        expect(voidOrError.isLeft()).toBeTruthy();
        expect(voidOrError.value).toBeInstanceOf(InsufficientStock);
    });
});

const requestArticlesData = {
    purposeData: {
        name: "Lavandaria",
        section: "Interna",
    },
    productsData: [
        { productId: "1001", quantity: 2 },
        { productId: "1002", quantity: 3 },
    ],
    requestTotal: "484,75",
    returnDate: "2021-01-01T16:40:00",
};
