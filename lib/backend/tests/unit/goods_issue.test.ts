import { ItemStock } from "../../domain/catalog/item_stock";
import { GoodsIssue, GoodsIssueStatus } from "../../domain/goods_issue/goods_issue";
import { Item, Status } from "../../domain/catalog/item";
import { GoodsIssueLine } from "../../domain/goods_issue/goods_issue_line";
import { Category } from "../../domain/catalog/category";
import { describe, expect, it } from "vitest";
import { User } from "../../domain/user";
import { ID } from "../../shared/id";

describe("Test Goods Issue", () => {
    it("Deve criar uma saída de mercadoria", () => {
        const goodsIssue = GoodsIssue.create(goodsIssueOptions);

        expect(goodsIssue.getStatus()).toEqual(GoodsIssueStatus.PENDING);
    });

    it("Deve garantir que a seção será definida caso a finalidade tenha seções", () => {
        const purpose = { description: "Lavandaria", details: "Interna" };
        const options = { ...goodsIssueOptions, purpose: purpose };

        const goodsIssue = GoodsIssue.create(options);

        expect(goodsIssue.purpose).toEqual(purpose);
        expect(goodsIssue.purpose.details).toBeDefined();
    });

    it("Deve garantir que a seção não será definida caso a finalidade não tenha seções", () => {
        const purpose = { description: "Aluguer" };

        const goodsIssue = GoodsIssue.create(goodsIssueOptions);

        expect(goodsIssue.purpose).toEqual(purpose);
        expect(goodsIssue.purpose.details).toBeUndefined();
    });

    it("Deve definir um destino a solicitação de saída de artigos", () => {
        const client = "John Doe";
        const purpose = { description: "Aluguer", notes: client };
        const options = { ...goodsIssueOptions, purpose: purpose };

        const goodsIssue = GoodsIssue.create(options);

        expect(goodsIssue.purpose.notes).toBeDefined();
        expect(goodsIssue.purpose.notes).toEqual(client);
    });

    it("Deve garantir que o solicitante seja definido", () => {
        const user = User.create("John Doe");
        const options = { ...goodsIssueOptions, user };

        const goodsIssue = GoodsIssue.create(options);

        expect(goodsIssue.user).toEqual(user);
    });

    it("Deve definir o momento que a solicitação foi efetuada", () => {
        const goodsIssue = GoodsIssue.create(goodsIssueOptions);

        expect(goodsIssue.issuedAt.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    it("Deve definir a data de devolução da solicitação", () => {
        const returnDate = "2024-01-21T00:00:00.000Z";

        const goodsIssue = GoodsIssue.create(goodsIssueOptions);

        expect(goodsIssue.returnDate.getTime()).toEqual(new Date(returnDate).getTime());
    });

    it("Deve adicionar os artigos a solicitação", () => {
        const goodsIssue = GoodsIssue.create(goodsIssueOptions);

        expect(goodsIssue.goodsIssueLines.length).toEqual(3);
    });

    it("Deve calcular o valor total da solicitação", () => {
        const total = "1050,00";

        const goodsIssue = GoodsIssue.create(goodsIssueOptions);

        expect(goodsIssue.getTotal().value).toEqual(total);
    });

    it("Deve calcular o valor total da linha com base na quantidade de artigos solicitados", () => {
        const goodsIssue = GoodsIssue.create(goodsIssueOptions);

        goodsIssue.addGoodsIssueLines(goodsIssueLines);

        const goodsIssueLine = goodsIssue.goodsIssueLines[0];
        expect(goodsIssueLine.getTotal().value).toEqual("450,00");
    });

    it("Deve calcular o valor total da linha com base num preço com casas decimais", () => {
        const category = Category.create("some-category");
        const item = Item.create({
            itemId: "some-id",
            name: "some",
            price: "1150,50",
            categoryId: category.categoryId,
            stock,
            condition,
        });
        const goodsIssueLines = [
            GoodsIssueLine.create({
                item,
                quantity: 3,
            }),
        ];
        const goodsIssue = GoodsIssue.create({
            ...goodsIssueOptions,
            goodsIssueLines,
        });

        const goodsIssueLine = goodsIssue.goodsIssueLines[0];

        expect(goodsIssueLine.getTotal().value).toEqual("3451,50");
    });

    it("Deve calcular o valor total da solicitação de uma linha, onde o total da linha tem casas decimais", () => {
        const category = Category.create("some-category");
        const item = Item.create({
            itemId: "some-id",
            name: "some",
            price: "1150,50",
            categoryId: category.categoryId,
            stock,
            condition,
        });
        const goodsIssueLines = [
            GoodsIssueLine.create({
                item,
                quantity: 3,
            }),
        ];
        const goodsIssue = GoodsIssue.create({
            ...goodsIssueOptions,
            goodsIssueLines,
        });

        expect(goodsIssue.getTotal().value).toEqual("3451,50");
    });

    it("Deve calcular o valor total de uma solicitação com várias linhas, onde o total de cada linha tem casas decimais", () => {
        const category = Category.create("some-category");
        const item1 = Item.create({
            itemId: "some-id",
            name: "some",
            price: "1150,50",
            categoryId: category.categoryId,
            stock,
            condition,
        });
        const item2 = Item.create({
            itemId: "some-id",
            name: "some",
            price: "1150,50",
            categoryId: category.categoryId,
            stock,
            condition,
        });
        const goodsIssueLines = [
            GoodsIssueLine.create({
                item: item1,
                quantity: 3,
            }),
            GoodsIssueLine.create({
                item: item2,
                quantity: 2,
            }),
        ];
        const goodsIssue = GoodsIssue.create({
            ...goodsIssueOptions,
            goodsIssueLines,
        });

        expect(goodsIssue.getTotal().value).toEqual("5752,50");
    });

    it("Deve ser o dobro do valor total da solicitação o valor da caução a reter", () => {
        const goodsIssue = GoodsIssue.create(goodsIssueOptions);

        expect(goodsIssue.getTotal().value).toEqual("1050,00");
        expect(goodsIssue.getSecurityDeposit().value).toEqual("2100,00");
    });
});

const stock = new ItemStock(10);
const condition = { status: Status.Bad, comment: "Some comment" };
const item = Item.create({
    itemId: "some-id",
    name: "some",
    price: "150,00",
    categoryId: ID.random(),
    stock,
    condition,
});

const goodsIssueItemOptions = {
    item,
    quantity: 3,
};

const goodsIssueLines: GoodsIssueLine[] = [
    GoodsIssueLine.create(goodsIssueItemOptions),
    GoodsIssueLine.create({ ...goodsIssueItemOptions, quantity: 2 }),
    GoodsIssueLine.create({ ...goodsIssueItemOptions, quantity: 2 }),
];

const goodsIssueOptions = {
    goodsIssueId: "some-id",
    purpose: { description: "Aluguer" },
    user: User.create("John Doe"),
    returnDate: "2024-01-21T00:00:00.000Z",
    total: "1050",
    goodsIssueLines: goodsIssueLines,
};
