import { ItemCategoryStock } from "@backend/domain/catalog/item_category_stock";
import { GoodsIssue, GoodsIssueStatus } from "@backend/domain/requests/goods_issue";
import { ItemCategory, ItemStatus } from "@backend/domain/catalog/item_category";
import { GoodsIssueLine } from "@backend/domain/requests/goods_issue_line";
import { Category } from "@backend/domain/catalog/category";
import { describe, expect, it } from "vitest";
import { User } from "@backend/domain/user";
import { ID } from "@backend/shared/id";

describe("Test Request Products", () => {
    it("should create the request products", () => {
        const request = GoodsIssue.create(requestOptions);

        expect(request.getStatus()).toEqual(GoodsIssueStatus.PENDING);
    });

    it("Deve garantir que a seção será definida caso a finalidade tenha seções", () => {
        const purpose = { description: "Lavandaria", details: "Interna" };
        const options = { ...requestOptions, purpose: purpose };

        const request = GoodsIssue.create(options);

        expect(request.purpose).toEqual(purpose);
        expect(request.purpose.details).toBeDefined();
    });

    it("Deve garantir que a seção não será definida caso a finalidade não tenha seções", () => {
        const purpose = { description: "Aluguer" };

        const request = GoodsIssue.create(requestOptions);

        expect(request.purpose).toEqual(purpose);
        expect(request.purpose.details).toBeUndefined();
    });

    it("Deve definir um destino a solicitação de saída de artigos", () => {
        const client = "John Doe";
        const purpose = { description: "Aluguer", notes: client };
        const options = { ...requestOptions, purpose: purpose };

        const request = GoodsIssue.create(options);

        expect(request.purpose.notes).toBeDefined();
        expect(request.purpose.notes).toEqual(client);
    });

    it("Deve garantir que o solicitante seja definido", () => {
        const user = User.create("John Doe");
        const options = { ...requestOptions, user };

        const request = GoodsIssue.create(options);

        expect(request.user).toEqual(user);
    });

    it("Deve definir o momento que a solicitação foi efetuada", () => {
        const request = GoodsIssue.create(requestOptions);

        expect(request.issuedAt.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    it("Deve definir a data de devolução da solicitação", () => {
        const returnDate = "2024-01-21T00:00:00.000Z";

        const request = GoodsIssue.create(requestOptions);

        expect(request.returnDate.getTime()).toEqual(new Date(returnDate).getTime());
    });

    it("Deve adicionar os artigos a solicitação", () => {
        const request = GoodsIssue.create(requestOptions);

        expect(request.goodsIssueLines.length).toEqual(3);
    });

    it("Deve calcular o valor total da solicitação", () => {
        const total = "1050,00";

        const request = GoodsIssue.create(requestOptions);

        expect(request.getTotal().value).toEqual(total);
    });

    it("Deve calcular o valor total da linha com base na quantidade de artigos solicitados", () => {
        const request = GoodsIssue.create(requestOptions);

        request.addGoodsIssueLines(goodsIssueLines);

        const requestLine = request.goodsIssueLines[0];
        expect(requestLine.getTotal().value).toEqual("450,00");
    });

    it("Deve calcular o valor total da linha com base num preço com casas decimais", () => {
        const category = Category.create("some-category");
        const item = ItemCategory.create({
            itemId: "some-id",
            name: "some",
            price: "1150,50",
            categoryId: category.categoryId,
            stock,
            condition,
        });
        const requestItems = [
            GoodsIssueLine.create({
                item,
                quantity: 3,
            }),
        ];
        const request = GoodsIssue.create({ ...requestOptions, goodsIssueLines: requestItems });

        const requestItem = request.goodsIssueLines[0];

        expect(requestItem.getTotal().value).toEqual("3451,50");
    });

    it("Deve calcular o valor total da solicitação de uma linha, onde o total da linha tem casas decimais", () => {
        const category = Category.create("some-category");
        const item = ItemCategory.create({
            itemId: "some-id",
            name: "some",
            price: "1150,50",
            categoryId: category.categoryId,
            stock,
            condition,
        });
        const requestItems = [
            GoodsIssueLine.create({
                item,
                quantity: 3,
            }),
        ];
        const requestedArticles = GoodsIssue.create({
            ...requestOptions,
            goodsIssueLines: requestItems,
        });

        expect(requestedArticles.getTotal().value).toEqual("3451,50");
    });

    it("Deve calcular o valor total de uma solicitação com várias linhas, onde o total de cada linha tem casas decimais", () => {
        const category = Category.create("some-category");
        const item1 = ItemCategory.create({
            itemId: "some-id",
            name: "some",
            price: "1150,50",
            categoryId: category.categoryId,
            stock,
            condition,
        });
        const item2 = ItemCategory.create({
            itemId: "some-id",
            name: "some",
            price: "1150,50",
            categoryId: category.categoryId,
            stock,
            condition,
        });
        const requestItems = [
            GoodsIssueLine.create({
                item: item1,
                quantity: 3,
            }),
            GoodsIssueLine.create({
                item: item2,
                quantity: 2,
            }),
        ];
        const request = GoodsIssue.create({ ...requestOptions, goodsIssueLines: requestItems });

        expect(request.getTotal().value).toEqual("5752,50");
    });

    it("Deve ser o dobro do valor total da solicitação o valor da caução a reter", () => {
        const request = GoodsIssue.create(requestOptions);

        expect(request.getTotal().value).toEqual("1050,00");
        expect(request.getSecurityDeposit().value).toEqual("2100,00");
    });
});

const stock = new ItemCategoryStock(10);
const condition = { status: ItemStatus.Bad, comment: "Some comment" };
const item = ItemCategory.create({
    itemId: "some-id",
    name: "some",
    price: "150,00",
    categoryId: ID.random(),
    stock,
    condition,
});

const requestItemOptions = {
    item,
    quantity: 3,
};

const goodsIssueLines: GoodsIssueLine[] = [
    GoodsIssueLine.create(requestItemOptions),
    GoodsIssueLine.create({ ...requestItemOptions, quantity: 2 }),
    GoodsIssueLine.create({ ...requestItemOptions, quantity: 2 }),
];

const requestOptions = {
    goodsIssueId: "some-id",
    purpose: { description: "Aluguer" },
    user: User.create("John Doe"),
    returnDate: "2024-01-21T00:00:00.000Z",
    total: "1050",
    goodsIssueLines: goodsIssueLines,
};
