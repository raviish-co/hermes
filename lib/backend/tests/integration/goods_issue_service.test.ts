import { InmemGoodsIssueRepository } from "../../persistense/inmem/inmem_goods_issue_repository";
import type { ItemCategoryRepository } from "../../domain/catalog/item_category_repository";
import { InsufficientStockItem } from "../../domain/catalog/insufficient_item_stock_error";
import { ItemCategoryNotFound } from "../../domain/catalog/item_category_not_found_error";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import { SequenceGenerator } from "../../domain/sequences/sequence_generator";
import { InvalidTotal } from "../../domain/goods_issue/invalid_total_error";
import { GoodsIssueService } from "../../application/goods_issue_service";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import { describe, expect, it, vi } from "vitest";
import { ID } from "../../shared/id";
import { DefaultPurposeSpecification } from "../../adapters/default_purpose_specification";

describe("Test Request Items", () => {
    it("Deve retornar error **PurposeNotFound** se não existir", async () => {
        const data = {
            ...requestData,
            purpose: { description: "Aluguer" },
        };
        const { service } = makeService();

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
    });

    it("Deve chamar o método **getAll** no repositório de artigos", async () => {
        const productsData = [{ itemId: "1001", quantity: 1 }];
        const { service, itemRepository } = makeService();
        const spy = vi.spyOn(itemRepository, "getAll");

        await service.new({ ...requestData, lines: productsData });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith([{ itemId: ID.New("1001"), variations: [] }]);
    });

    it("Deve retornar um erro **ArticleNotFound** se não existir", async () => {
        const productsData = [{ itemId: "1008", quantity: 1 }];
        const { service } = makeService();

        const error = await service.new({
            ...requestData,
            lines: productsData,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(ItemCategoryNotFound);
    });

    it("Deve chamar o método **save** no repositório de solicitações de artigos", async () => {
        const productsData = [{ itemId: "1001", quantity: 1 }];
        const total = "4500,00";
        const { service, requestRepository } = makeService();

        const spy = vi.spyOn(requestRepository, "save");

        const error = await service.new({
            ...requestData,
            lines: productsData,
            total,
            securityDeposit: "9000,00",
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve efectuar a solicitação de um uníco artigo", async () => {
        const productsData = [{ itemId: "1001", quantity: 1 }];
        const { service, requestRepository } = makeService();

        await service.new({
            ...requestData,
            lines: productsData,
            total: "4500,00",
            securityDeposit: "9000,00",
        });

        const request = await requestRepository.last();
        const goodsIssueLine = request.goodsIssueLines[0];

        expect(request.goodsIssueLines.length).toBe(1);
        expect(goodsIssueLine.item.itemId.toString()).toEqual("1001");
        expect(goodsIssueLine.getTotal().value).toEqual("4500,00");
        expect(goodsIssueLine.quantity).toEqual(1);
    });

    it("Deve efectuar a solicitação de mais de um artigo", async () => {
        const productsData = [
            { itemId: "1001", quantity: 1 },
            { itemId: "1002", quantity: 1 },
        ];
        const total = "20000,00";
        const securityDeposit = "40000,00";
        const { service, requestRepository } = makeService();

        await service.new({
            ...requestData,
            lines: productsData,
            total,
            securityDeposit,
        });

        const request = await requestRepository.last();
        expect(request.goodsIssueLines.length).toBe(2);
        expect(request.getTotal().value).toEqual(total);
    });

    it("Deve retornar **InvalidTotal** se o total enviado pelo solicitante for diferente do total a pagar da solicitação", async () => {
        const total = "25,00";
        const { service } = makeService();

        const error = await service.new({
            ...requestData,
            total,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidTotal);
    });

    it("Deve registrar a data de devolução da solicitação", async () => {
        const { service, requestRepository } = makeService();

        await service.new(requestData);

        const request = await requestRepository.last();

        expect(request.returnDate).toBeDefined();
        expect(request.returnDate).toBeInstanceOf(Date);
    });

    it("Deve solicitar vários artigos com diferentes quantidades", async () => {
        const { service, requestRepository } = makeService();

        await service.new(requestData);

        const request = await requestRepository.last();

        expect(request.goodsIssueLines.length).toBe(2);
        expect(request.getTotal().value).toEqual("55500,00");
    });

    it("Deve retornar **InsufficientStock** se a quantidade solicitada for maior que a quantidade em estoque", async () => {
        const productsData = [
            { itemId: "1001", quantity: 10 },
            { itemId: "1002", quantity: 15 },
        ];

        const { service } = makeService();
        const error = await service.new({
            ...requestData,
            lines: productsData,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InsufficientStockItem);
    });

    it("Deve atualizar o estoque dos artigos solicitados no repositório", async () => {
        const { service, itemRepository } = makeService({});

        const spy = vi.spyOn(itemRepository, "updateAll");

        await service.new(requestData);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve diminuir o estoque dos artigos solicitados", async () => {
        const { service, itemRepository } = makeService();

        await service.new(requestData);

        const item = await itemRepository.getById(ID.New("1001"));

        const stock = item.getStock();

        expect(stock.getQuantity()).toEqual(8);
    });

    it("Deve ser adicionada a solicitação, caso a finalidade tenha uma seção", async () => {
        const { service, requestRepository } = makeService();

        await service.new(requestData);

        const request = await requestRepository.last();

        expect(request.purpose.details).toBeDefined();
        expect(request.purpose.details).toEqual("Interna");
    });

    it("Deve ser adicionada a solicitação caso a finalidade tenha um destino", async () => {
        const data = {
            ...requestData,
            purpose: {
                description: "Lavandaria",
                detailConstraint: "Externa",
                notes: "John Doe",
            },
        };

        const { service, requestRepository } = makeService();

        await service.new(data);

        const request = await requestRepository.last();

        expect(request.purpose.notes).toBeDefined();
        expect(request.purpose.notes).toEqual("John Doe");
    });

    it("Deve retornar **InsufficientStock** se a quantidade solicitada de uma variação não tiver estoque suficiente", async () => {
        const productsData = [
            { itemId: "1001", quantity: 2 },
            { itemId: "1002", quantity: 3 },
            { itemId: "1003", quantity: 14, variations: ["1004", "1005"] },
        ];
        const { service } = makeService();

        const error = await service.new({
            ...requestData,
            lines: productsData,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InsufficientStockItem);
    });

    it("Deve retornar **InvalidTotal** se o total da çaução não foi igual ao valor calculado", async () => {
        const { service } = makeService();

        const error = await service.new({
            ...requestData,
            securityDeposit: "100,00",
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidTotal);
    });

    it("Deve gerar o ID da solicitação", async () => {
        const { service, requestRepository } = makeService();

        await service.new(requestData);

        const request = await requestRepository.get(ID.New("GS - 1000"));

        expect(request.goodsIssueId).toBeDefined();
        expect(request.goodsIssueId).toBeInstanceOf(ID);
        expect(request.goodsIssueId.toString()).toEqual("GS - 1000");
    });

    it("Deve gerar 2 solicitações com IDs diferentes", async () => {
        const { service, requestRepository } = makeService();

        await service.new(requestData);

        await service.new(requestData);

        const goodsIssue1 = await requestRepository.get(ID.New("GS - 1000"));
        const goodsIssue2 = await requestRepository.get(ID.New("GS - 1001"));

        expect(goodsIssue1.goodsIssueId.toString()).toEqual("GS - 1000");
        expect(goodsIssue2.goodsIssueId.toString()).toEqual("GS - 1001");
    });

    it("Deve receber o estado atual dos artigos solicitados", async () => {
        const { service, itemRepository } = makeService();

        await service.new(requestData);

        const item1 = await itemRepository.getById(ID.New("1001"));
        const item2 = await itemRepository.getById(ID.New("1002"));

        expect(item1.getCondition().status).toEqual("Bom");
        expect(item2.getCondition().status).toEqual("Mau");
        expect(item1.getCondition().comment).toBeUndefined();
        expect(item2.getCondition().comment).toEqual("T-shirt rasgada");
    });
});

const requestData = {
    purpose: {
        description: "Lavandaria",
        detailConstraint: "Interna",
    },
    lines: [
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
    total: "55500,00",
    securityDeposit: "111000,00",
    returnDate: "2021-01-01T16:40:00",
};

interface Dependencies {
    itemRepository?: ItemCategoryRepository;
}

function makeService(deps?: Dependencies) {
    const purposeSource = new DefaultPurposeSpecification();
    const itemRepository = deps?.itemRepository ?? new ItemRepositoryStub();
    const requestRepository = new InmemGoodsIssueRepository();
    const storage = new InmemSequenceStorage();
    const generator = new SequenceGenerator(storage, 1000);
    const service = new GoodsIssueService(
        itemRepository,
        requestRepository,
        generator,
        purposeSource
    );

    return { requestRepository, service, itemRepository, purposeSource };
}
