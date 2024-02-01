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
import { SequenceGenerator } from "../../domain/sequence_generator";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import { StockRepository } from "../../domain/stock_repository";
import { RequestRepository } from "../../domain/requests/request_repository";
import { ItemRepository } from "../../domain/catalog/item_repository";
import { PurposeSource } from "../../domain/purposes/purpose_source";

describe("Test Purpose Source", () => {
    it("should be return an  list void of purposes", async () => {
        const purposeSource = new FakePurposeSource();
        const { service } = makeService({ purposeSource });

        const purposes = await service.listPurposes();

        expect(purposes).toEqual([]);
    });

    it("should be call list method in source data", async () => {
        const purposeSource = new FakePurposeSource();
        const { service } = makeService({ purposeSource });
        const spy = vi.spyOn(purposeSource, "list");

        await service.listPurposes();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should retrieve a list of purposes from data", async () => {
        const { service } = makeService();

        const purposes = await service.listPurposes();

        expect(purposes.length).toBeGreaterThanOrEqual(1);
        expect(purposes[0].name).toEqual("Lavandaria");
        expect(purposes[0].sections).toEqual(["Interna", "Externa"]);
    });

    it("should retrieve a purpose without sections", async () => {
        const { service } = makeService();

        const purposes = await service.listPurposes();

        expect(purposes.length).toBeGreaterThanOrEqual(2);
        expect(purposes[1].name).toEqual("Arranjo");
        expect(purposes[1].sections).toBeUndefined();
    });
});

describe("Test RequestArticles Service", () => {
    it("Deve chamar o método **exists** para encontrar a finalidade", () => {
        const purposeName = "Aluguer";
        const productsData = [{ productId: "1001", quantity: 1 }];
        const data = {
            ...requestData,
            purposeData: {
                name: purposeName,
            },
            productsData,
        };

        const { service, purposeSource } = makeService();

        const spy = vi.spyOn(purposeSource, "exists");

        service.requestItems(data);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(purposeName);
    });

    it("Deve retornar error **PurposeNotFound** se não existir", async () => {
        const data = {
            ...requestData,
            purposeData: { name: "Aluguer" },
        };
        const { service } = makeService();

        const error = await service.requestItems(data);

        expect(error.isLeft()).toBeTruthy();
    });

    it("Deve chamar o método **getAll** no repositório de artigos", async () => {
        const productsData = [{ productId: "1001", quantity: 1 }];
        const { service, itemRepository } = makeService();
        const spy = vi.spyOn(itemRepository, "getAll");

        await service.requestItems({ ...requestData, productsData });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith([{ productId: ID.New("1001"), variations: [] }]);
    });

    it("Deve retornar um erro **ArticleNotFound** se não existir", async () => {
        const productsData = [{ productId: "1008", quantity: 1 }];
        const { service } = makeService();

        const error = await service.requestItems({
            ...requestData,
            productsData,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(ProductNotFound);
    });

    it("Deve chamar o método **save** no repositório de solicitações de artigos", async () => {
        const productsData = [{ productId: "1001", quantity: 1 }];
        const total = "15,95";
        const { service, requestRepository } = makeService();

        const spy = vi.spyOn(requestRepository, "save");

        await service.requestItems({
            ...requestData,
            productsData,
            total,
            securityDeposit: "31,90",
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve efectuar a solicitação de um uníco artigo", async () => {
        const productsData = [{ productId: "1001", quantity: 1 }];
        const { service, requestRepository } = makeService();

        await service.requestItems({
            ...requestData,
            productsData,
            total: "15,95",
            securityDeposit: "31,90",
        });

        const request = await requestRepository.last();
        const requestItem = request.items[0];

        expect(request.items.length).toBe(1);
        expect(requestItem.item.product.productId.toString()).toEqual("1001");
        expect(requestItem.getTotal().value).toEqual("15,95");
        expect(requestItem.quantity).toEqual(1);
    });

    it("Deve efectuar a solicitação de mais de um artigo", async () => {
        const productsData = [
            { productId: "1001", quantity: 1 },
            { productId: "1002", quantity: 1 },
        ];
        const total = "166,90";
        const securityDeposit = "333,80";
        const { service, requestRepository } = makeService();

        await service.requestItems({
            ...requestData,
            productsData,
            total,
            securityDeposit,
        });

        const request = await requestRepository.last();
        expect(request.items.length).toBe(2);
        expect(request.getTotal().value).toEqual(total);
    });

    it("Deve verificar se o calculo do total a pagar da solicitação é igual ao total enviado pelo solicitante", async () => {
        const productsData = [
            { productId: "1001", quantity: 1 },
            { productId: "1002", quantity: 1 },
        ];
        const total = "166,90";
        const securityDeposit = "333,80";
        const { service, requestRepository } = makeService();

        await service.requestItems({
            ...requestData,
            productsData,
            total,
            securityDeposit,
        });

        const request = await requestRepository.last();

        expect(request.isSameTotal(total)).toBeTruthy();
    });

    it("Deve retornar **InvalidTotal** se o total enviado pelo solicitante for diferente do total a pagar da solicitação", async () => {
        const requestTotal = "25,00";
        const { service } = makeService();

        const error = await service.requestItems({
            ...requestData,
            total: requestTotal,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidTotal);
    });

    it("Deve registrar a data de devolução da solicitação", async () => {
        const { service, requestRepository } = makeService();

        await service.requestItems(requestData);

        const request = await requestRepository.last();

        expect(request.returnDate).toBeDefined();
        expect(request.returnDate).toBeInstanceOf(Date);
    });

    it("Deve solicitar vários artigos com diferentes quantidades", async () => {
        const { service, requestRepository } = makeService();

        await service.requestItems(requestData);

        const request = await requestRepository.last();

        expect(request.items.length).toBe(2);
        expect(request.getTotal().value).toEqual("484,75");
    });

    it("Deve retornar **InsufficientStock** se a quantidade solicitada for maior que a quantidade em estoque", async () => {
        const productsData = [
            { productId: "1001", quantity: 10 },
            { productId: "1002", quantity: 15 },
        ];

        const { service } = makeService();
        const error = await service.requestItems({
            ...requestData,
            productsData,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InsufficientStock);
    });

    it.skip("Deve atualizar o estoque dos artigos solicitados no repositório", async () => {
        const { service, itemRepository } = makeService();

        const spy = vi.spyOn(itemRepository, "updateStock");

        await service.requestItems(requestData);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it.skip("Deve diminuir o estoque dos artigos solicitados", async () => {
        const { service, itemRepository } = makeService();

        await service.requestItems(requestData);

        const item = await itemRepository?.getById(ID.New("1001"));

        expect(item?.getStock()).toEqual(8);
    });

    it("Caso a finalidade tenha uma seção, deve ser adicionada a solicitação", async () => {
        const { service, requestRepository } = makeService();

        await service.requestItems(requestData);

        const requestArticles = await requestRepository.last();

        expect(requestArticles.purpose.section).toBeDefined();
        expect(requestArticles.purpose.section).toEqual("Interna");
    });

    it("Deve ser adicionada a solicitação caso a finalidade tenha um destino", async () => {
        const data = {
            ...requestData,
            purposeData: {
                name: "Lavandaria",
                section: "Externa",
                recipient: "John Doe",
            },
        };

        const { service, requestRepository } = makeService();

        await service.requestItems(data);

        const request = await requestRepository.last();

        expect(request.purpose.recipient).toBeDefined();
        expect(request.purpose.recipient).toEqual("John Doe");
    });

    it("Deve retornar **InsufficientStock** se a quantidade solicitada de uma variação não tiver estoque suficiente", async () => {
        const productsData = [
            { productId: "1001", quantity: 2 },
            { productId: "1002", quantity: 3 },
            { productId: "1003", quantity: 4, variations: ["1004", "1005"] },
        ];
        const { service } = makeService();

        const error = await service.requestItems({
            ...requestData,
            productsData,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InsufficientStock);
    });

    it("Deve retornar **InvalidTotal** se o total da çaução não foi igual ao valor calculado", async () => {
        const { service } = makeService();

        const error = await service.requestItems({
            ...requestData,
            securityDeposit: "100,00",
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidTotal);
    });

    it("Deve gerar o ID da solicitação", async () => {
        const { service, requestRepository } = makeService();

        await service.requestItems(requestData);

        const request = await requestRepository.get(ID.New("GS - 1000"));

        expect(request.requestId).toBeDefined();
        expect(request.requestId).toBeInstanceOf(ID);
        expect(request.requestId.toString()).toEqual("GS - 1000");
    });
});

const requestData = {
    purposeData: {
        name: "Lavandaria",
        section: "Interna",
    },
    productsData: [
        { productId: "1001", quantity: 2 },
        { productId: "1002", quantity: 3 },
    ],
    total: "484,75",
    securityDeposit: "969,50",
    returnDate: "2021-01-01T16:40:00",
};

interface Dependencies {
    itemRepository?: ItemRepository;
    purposeSource?: PurposeSource;
}

function makeService(deps?: Dependencies) {
    const purposeSource = deps?.purposeSource ?? new PurposeSourceStub();
    const itemRepository = deps?.itemRepository ?? new ItemRepositoryStub();
    const stockRepository = new StockRepositoryStub();
    const requestRepository = new InmemRequestRepository();
    const storage = new InmemSequenceStorage();
    const generator = new SequenceGenerator(storage, 1000);
    const service = new RequestService(
        purposeSource,
        itemRepository,
        requestRepository,
        stockRepository,
        generator
    );

    return { requestRepository, service, itemRepository, purposeSource };
}
