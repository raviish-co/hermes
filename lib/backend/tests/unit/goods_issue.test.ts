import { GoodsIssue, GoodsIssueStatus } from "../../domain/goods_issue/goods_issue";
import { GoodsIssueLine } from "../../domain/goods_issue/goods_issue_line";
import { ItemBuilder } from "../../domain/catalog/item_builder";
import { Category } from "../../domain/catalog/category";
import { Item } from "../../domain/catalog/item";
import { Decimal } from "../../shared/decimal";
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

    it("Deve definir uma nota a solicitação de saída de artigos", () => {
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
        const goodsIssueLines = [GoodsIssueLine.create(item1.value as Item, 3)];
        const goodsIssue = GoodsIssue.create({
            ...goodsIssueOptions,
            goodsIssueLines,
        });

        const goodsIssueLine = goodsIssue.goodsIssueLines[0];

        expect(goodsIssueLine.getTotal().value).toEqual("3451,50");
    });

    it("Deve calcular o valor total da solicitação de uma linha, onde o total da linha tem casas decimais", () => {
        const goodsIssueLines = [GoodsIssueLine.create(item1.value as Item, 3)];
        const goodsIssue = GoodsIssue.create({
            ...goodsIssueOptions,
            goodsIssueLines,
        });

        expect(goodsIssue.getTotal().value).toEqual("3451,50");
    });

    it("Deve calcular o valor total de uma solicitação com várias linhas, onde o total de cada linha tem casas decimais", () => {
        const goodsIssueLines = [
            GoodsIssueLine.create(item1.value as Item, 3),
            GoodsIssueLine.create(item1.value as Item, 2),
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

const category = Category.create("some-category");

const item = new ItemBuilder()
    .withItemId(ID.fromString("some-id"))
    .withName("some")
    .withPrice(Decimal.fromString("150,00"))
    .withSectionId(ID.random())
    .withCategoryId(ID.random())
    .withStock(10)
    .withBadCondition("Some comment")
    .build();

const item1 = new ItemBuilder()
    .withItemId(ID.fromString("some-id"))
    .withCategoryId(category.categoryId)
    .withName("some")
    .withSectionId(ID.random())
    .withPrice(Decimal.fromString("1150,50"))
    .withStock(10)
    .withBadCondition("Some comment")
    .build();

const goodsIssueLines: GoodsIssueLine[] = [
    GoodsIssueLine.create(item.value as Item, 3),
    GoodsIssueLine.create(item.value as Item, 2),
    GoodsIssueLine.create(item.value as Item, 2),
];

const goodsIssueOptions = {
    goodsIssueId: "some-id",
    purpose: { description: "Aluguer" },
    user: User.create("John Doe"),
    returnDate: "2024-01-21T00:00:00.000Z",
    total: "1050",
    goodsIssueLines,
};
