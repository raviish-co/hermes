import { InsufficientStockItem } from "../../domain/sequences/insufficient_item_stock_error";
import { InmemRequestRepository } from "../../persistense/inmem/inmem_request_repository";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import { ItemNotFound } from "../../domain/catalog/item_not_found_error";
import { SequenceGenerator } from "../../domain/sequences/sequence_generator";
import { InvalidTotal } from "../../domain/requests/invalid_total_error";
import { ItemRepository } from "../../domain/catalog/item_repository";
import { PurposeSource } from "../../domain/purposes/purpose_source";
import { RequestService } from "../../application/request_service";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import { FakePurposeSource } from "../purpose_source_fake";
import { PurposeSourceStub } from "../purpose_source_stub";
import { describe, expect, it, vi } from "vitest";
import { ID } from "../../shared/id";

describe("Test List Purposes ", () => {
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

describe("Test Request Items", () => {
    it("Deve chamar o método **exists** para encontrar a finalidade", () => {
        const purposeName = "Aluguer";
        const productsData = [{ itemId: "1001", quantity: 1 }];
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
        const productsData = [{ itemId: "1001", quantity: 1 }];
        const { service, itemRepository } = makeService();
        const spy = vi.spyOn(itemRepository, "getAll");

        await service.requestItems({ ...requestData, productsData });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith([{ itemId: ID.New("1001"), variations: [] }]);
    });

    it("Deve retornar um erro **ArticleNotFound** se não existir", async () => {
        const productsData = [{ itemId: "1008", quantity: 1 }];
        const { service } = makeService();

        const error = await service.requestItems({
            ...requestData,
            productsData,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(ItemNotFound);
    });

    it("Deve chamar o método **save** no repositório de solicitações de artigos", async () => {
        const productsData = [{ itemId: "1001", quantity: 1 }];
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
        const productsData = [{ itemId: "1001", quantity: 1 }];
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
        expect(requestItem.item.itemId.toString()).toEqual("1001");
        expect(requestItem.getTotal().value).toEqual("15,95");
        expect(requestItem.quantity).toEqual(1);
    });

    it("Deve efectuar a solicitação de mais de um artigo", async () => {
        const productsData = [
            { itemId: "1001", quantity: 1 },
            { itemId: "1002", quantity: 1 },
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

    it("Deve retornar **InvalidTotal** se o total enviado pelo solicitante for diferente do total a pagar da solicitação", async () => {
        const total = "25,00";
        const { service } = makeService();

        const error = await service.requestItems({
            ...requestData,
            total,
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
            { itemId: "1001", quantity: 10 },
            { itemId: "1002", quantity: 15 },
        ];

        const { service } = makeService();
        const error = await service.requestItems({
            ...requestData,
            productsData,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InsufficientStockItem);
    });

    it("Deve atualizar o estoque dos artigos solicitados no repositório", async () => {
        const { service, itemRepository } = makeService({});

        const spy = vi.spyOn(itemRepository, "updateAll");

        await service.requestItems(requestData);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve diminuir o estoque dos artigos solicitados", async () => {
        const { service, itemRepository } = makeService();

        await service.requestItems(requestData);

        const item = await itemRepository.getById(ID.New("1001"));

        const stock = item.getStock();

        expect(stock.getQuantity()).toEqual(8);
    });

    it("Deve ser adicionada a solicitação, caso a finalidade tenha uma seção", async () => {
        const { service, requestRepository } = makeService();

        await service.requestItems(requestData);

        const request = await requestRepository.last();

        expect(request.purpose.section).toBeDefined();
        expect(request.purpose.section).toEqual("Interna");
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
            { itemId: "1001", quantity: 2 },
            { itemId: "1002", quantity: 3 },
            { itemId: "1003", quantity: 14, variations: ["1004", "1005"] },
        ];
        const { service } = makeService();

        const error = await service.requestItems({
            ...requestData,
            productsData,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InsufficientStockItem);
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

    it("Deve gerar 2 solicitações com IDs diferentes", async () => {
        const { service, requestRepository } = makeService();

        await service.requestItems(requestData);

        await service.requestItems(requestData);

        const request1 = await requestRepository.get(ID.New("GS - 1000"));
        const request2 = await requestRepository.get(ID.New("GS - 1001"));

        expect(request1.requestId.toString()).toEqual("GS - 1000");
        expect(request2.requestId.toString()).toEqual("GS - 1001");
    });

    it("Deve receber o estado atual dos artigos solicitados", async () => {
        const { service, itemRepository } = makeService();

        await service.requestItems(requestData);

        const item1 = await itemRepository.getById(ID.New("1001"));
        const item2 = await itemRepository.getById(ID.New("1002"));

        expect(item1.getCondition().status).toEqual("Bom");
        expect(item2.getCondition().status).toEqual("Mau");
        expect(item1.getCondition().comment).toBeUndefined();
        expect(item2.getCondition().comment).toEqual("T-shirt rasgada");
    });
});

const requestData = {
    purposeData: {
        name: "Lavandaria",
        section: "Interna",
    },
    productsData: [
        {
            itemId: "1001",
            quantity: 2,
            condition: { status: "Bom" },
        },
        {
            itemId: "1002",
            quantity: 3,
            condition: { status: "Mau", comment: "T-shirt rasgada" },
        },
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
    const requestRepository = new InmemRequestRepository();
    const storage = new InmemSequenceStorage();
    const generator = new SequenceGenerator(storage, 1000);
    const service = new RequestService(purposeSource, itemRepository, requestRepository, generator);

    return { requestRepository, service, itemRepository, purposeSource };
}
