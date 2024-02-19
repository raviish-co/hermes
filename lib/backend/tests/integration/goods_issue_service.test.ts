import { InmemGoodsIssueRepository } from "../../persistense/inmem/inmem_goods_issue_repository";
import type { ItemCategoryRepository } from "../../domain/catalog/item_repository";
import { InsufficientStock } from "../../domain/catalog/insufficient_stock_error";
import { DefaultPurposeSpecification } from "../../adapters/default_purpose_specification";
import { ItemNotFound } from "../../domain/catalog/item_not_found_error";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import { SequenceGenerator } from "../../domain/sequences/sequence_generator";
import { InvalidTotal } from "../../domain/goods_issue/invalid_total_error";
import { ItemCategoryRepositoryStub } from "../stubs/item_repository_stub";
import { GoodsIssueService } from "../../application/goods_issue_service";
import { describe, expect, it, vi } from "vitest";
import { ID } from "../../shared/id";

describe("Test Goods Issue", () => {
    it("Deve retornar error **PurposeNotFound** se não existir", async () => {
        const data = {
            ...goodsIssueData,
            purpose: { description: "Alguel" },
        };
        const { service } = makeService();

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
    });

    it("Deve chamar o método **getAll** no repositório de artigos", async () => {
        const lines = [{ itemId: "1001", quantity: 1 }];
        const { service, itemCategoryRepository } = makeService();
        const spy = vi.spyOn(itemCategoryRepository, "getAll");

        await service.new({ ...goodsIssueData, lines });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith([{ itemId: ID.fromString("1001") }]);
    });

    it("Deve retornar um erro **ItemNotFound** se não existir", async () => {
        const lines = [{ itemId: "1008", quantity: 1 }];
        const { service } = makeService();

        const error = await service.new({
            ...goodsIssueData,
            lines,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(ItemNotFound);
    });

    it("Deve chamar o método **save** no repositório de solicitações de artigos", async () => {
        const lines = [{ itemId: "1001", quantity: 1 }];
        const total = "4500,00";
        const { service, goodsIssuerepository } = makeService();

        const spy = vi.spyOn(goodsIssuerepository, "save");

        await service.new({
            ...goodsIssueData,
            lines,
            total,
            securityDeposit: "9000,00",
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve efectuar a solicitação de um uníco artigo", async () => {
        const lines = [{ itemId: "1001", quantity: 1 }];
        const { service, goodsIssuerepository } = makeService();

        await service.new({
            ...goodsIssueData,
            lines,
            total: "4500,00",
            securityDeposit: "9000,00",
        });

        const goodsIssue = await goodsIssuerepository.last();
        const goodsIssueLine = goodsIssue.goodsIssueLines[0];

        expect(goodsIssue.goodsIssueLines.length).toBe(1);
        expect(goodsIssueLine.item.itemId.toString()).toEqual("1001");
        expect(goodsIssueLine.getTotal().value).toEqual("4500,00");
        expect(goodsIssueLine.quantity).toEqual(1);
    });

    it("Deve efectuar a solicitação de mais de um artigo", async () => {
        const lines = [
            { itemId: "1001", quantity: 1 },
            { itemId: "1002", quantity: 1 },
        ];
        const total = "20000,00";
        const securityDeposit = "40000,00";
        const { service, goodsIssuerepository } = makeService();

        await service.new({
            ...goodsIssueData,
            lines,
            total,
            securityDeposit,
        });

        const goodsIssue = await goodsIssuerepository.last();
        expect(goodsIssue.goodsIssueLines.length).toBe(2);
        expect(goodsIssue.getTotal().value).toEqual(total);
    });

    it("Deve retornar **InvalidTotal** se o total enviado pelo solicitante for diferente do total a pagar da solicitação", async () => {
        const total = "25,00";
        const { service } = makeService();

        const error = await service.new({
            ...goodsIssueData,
            total,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidTotal);
    });

    it("Deve registrar a data de devolução da solicitação", async () => {
        const { service, goodsIssuerepository } = makeService();

        await service.new(goodsIssueData);

        const goodsIssue = await goodsIssuerepository.last();

        expect(goodsIssue.returnDate).toBeDefined();
        expect(goodsIssue.returnDate).toBeInstanceOf(Date);
    });

    it("Deve solicitar vários artigos com diferentes quantidades", async () => {
        const { service, goodsIssuerepository } = makeService();

        await service.new(goodsIssueData);

        const goodsIssue = await goodsIssuerepository.last();

        expect(goodsIssue.goodsIssueLines.length).toBe(2);
        expect(goodsIssue.getTotal().value).toEqual("55500,00");
    });

    it("Deve retornar **InsufficientStock** se a quantidade solicitada for maior que a quantidade em estoque", async () => {
        const lines = [
            { itemId: "1001", quantity: 10 },
            { itemId: "1002", quantity: 15 },
        ];

        const { service } = makeService();
        const error = await service.new({
            ...goodsIssueData,
            lines,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InsufficientStock);
    });

    it("Deve atualizar o estoque dos artigos solicitados no repositório", async () => {
        const { service, itemCategoryRepository } = makeService({});

        const spy = vi.spyOn(itemCategoryRepository, "updateAll");

        await service.new(goodsIssueData);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve diminuir o estoque dos artigos solicitados", async () => {
        const { service, itemCategoryRepository } = makeService();

        await service.new(goodsIssueData);

        const item = await itemCategoryRepository.getById(ID.fromString("1001"));

        const stock = item.getStock();

        expect(stock.quantity).toEqual(8);
    });

    it("Deve ser adicionada a solicitação, caso a finalidade tenha uma seção", async () => {
        const { service, goodsIssuerepository } = makeService();

        await service.new(goodsIssueData);

        const goodsIssue = await goodsIssuerepository.last();

        expect(goodsIssue.purpose.details).toBeDefined();
        expect(goodsIssue.purpose.details).toEqual("Interna");
    });

    it("Deve ser adicionada a solicitação caso a finalidade tenha um destino", async () => {
        const data = {
            ...goodsIssueData,
            purpose: {
                description: "Lavandaria",
                detailConstraint: "Externa",
                notes: "John Doe",
            },
        };

        const { service, goodsIssuerepository } = makeService();

        await service.new(data);

        const goodsIssue = await goodsIssuerepository.last();

        expect(goodsIssue.purpose.notes).toBeDefined();
        expect(goodsIssue.purpose.notes).toEqual("John Doe");
    });

    it("Deve retornar **InsufficientStock** se a quantidade solicitada de uma variação não tiver estoque suficiente", async () => {
        const lines = [
            { itemId: "1001", quantity: 2 },
            { itemId: "1002", quantity: 3 },
            { itemId: "1003", quantity: 14, variations: ["1004", "1005"] },
        ];
        const { service } = makeService();

        const error = await service.new({
            ...goodsIssueData,
            lines,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InsufficientStock);
    });

    it("Deve retornar **InvalidTotal** se o total da çaução não foi igual ao valor calculado", async () => {
        const { service } = makeService();

        const error = await service.new({
            ...goodsIssueData,
            securityDeposit: "100,00",
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidTotal);
    });

    it("Deve gerar o ID da solicitação", async () => {
        const { service, goodsIssuerepository } = makeService();

        await service.new(goodsIssueData);

        const goodsIssue = await goodsIssuerepository.get(ID.fromString("GS - 1000"));

        expect(goodsIssue.goodsIssueId).toBeDefined();
        expect(goodsIssue.goodsIssueId).toBeInstanceOf(ID);
        expect(goodsIssue.goodsIssueId.toString()).toEqual("GS - 1000");
    });

    it("Deve gerar 2 solicitações com IDs diferentes", async () => {
        const { service, goodsIssuerepository } = makeService();

        await service.new(goodsIssueData);

        await service.new(goodsIssueData);

        const goodsIssue1 = await goodsIssuerepository.get(ID.fromString("GS - 1000"));
        const goodsIssue2 = await goodsIssuerepository.get(ID.fromString("GS - 1001"));

        expect(goodsIssue1.goodsIssueId.toString()).toEqual("GS - 1000");
        expect(goodsIssue2.goodsIssueId.toString()).toEqual("GS - 1001");
    });

    it("Deve receber o estado atual dos artigos solicitados", async () => {
        const { service, itemCategoryRepository } = makeService();

        await service.new(goodsIssueData);

        const item1 = await itemCategoryRepository.getById(ID.fromString("1001"));
        const item2 = await itemCategoryRepository.getById(ID.fromString("1002"));

        expect(item1.getCondition().status).toEqual("Bom");
        expect(item2.getCondition().status).toEqual("Mau");
        expect(item1.getCondition().comment).toBeUndefined();
        expect(item2.getCondition().comment).toEqual("T-shirt rasgada");
    });
});

const goodsIssueData = {
    purpose: {
        description: "Lavandaria",
        detailConstraint: "Interna",
        notes: "Nome",
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
    itemCategoryRepository?: ItemCategoryRepository;
}

function makeService(deps?: Dependencies) {
    const purposeSource = new DefaultPurposeSpecification();
    const itemCategoryRepository = deps?.itemCategoryRepository ?? new ItemCategoryRepositoryStub();
    const goodsIssuerepository = new InmemGoodsIssueRepository();
    const storage = new InmemSequenceStorage();
    const generator = new SequenceGenerator(storage, 1000);
    const service = new GoodsIssueService(
        itemCategoryRepository,
        goodsIssuerepository,
        generator,
        purposeSource
    );

    return { goodsIssuerepository, service, itemCategoryRepository, purposeSource };
}
