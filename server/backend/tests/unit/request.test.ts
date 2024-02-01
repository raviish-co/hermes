import { Request, RequestStatus } from "../../domain/requests/request";
import { RequestItem } from "../../domain/requests/request_item";
import { Item, ItemStatus } from "../../domain/catalog/item";
import { Product } from "../../domain/catalog/product";
import { describe, expect, it } from "vitest";
import { User } from "../../domain/user";

describe("Test Request Products", () => {
    it("should create the request products", () => {
        const request = Request.create(requestProductsOptions);

        expect(request.getStatus()).toEqual(RequestStatus.PENDING);
    });

    it("Deve garantir que a seção será definida caso a finalidade tenha seções", () => {
        const purpose = { name: "Lavandaria", section: "Interna" };
        const options = {
            ...requestProductsOptions,
            purpose: purpose,
        };

        const request = Request.create(options);

        expect(request.purpose).toEqual(purpose);
        expect(request.purpose.section).toBeDefined();
    });

    it("Deve garantir que a seção não será definida caso a finalidade não tenha seções", () => {
        const purpose = { name: "Aluguer" };

        const request = Request.create(requestProductsOptions);

        expect(request.purpose).toEqual(purpose);
        expect(request.purpose.section).toBeUndefined();
    });

    it("Deve definir um destino a solicitação de saída de artigos", () => {
        const client = "John Doe";
        const purpose = { name: "Aluguer", recipient: client };
        const options = {
            ...requestProductsOptions,
            purpose: purpose,
        };

        const request = Request.create(options);

        expect(request.purpose.recipient).toBeDefined();
        expect(request.purpose.recipient).toEqual(client);
    });

    it("Deve garantir que o solicitante seja definido", () => {
        const user = User.create("John Doe");
        const options = {
            ...requestProductsOptions,
            user,
        };

        const request = Request.create(options);

        expect(request.user).toEqual(user);
    });

    it("Deve definir o momento que a solicitação foi efetuada", () => {
        const request = Request.create(requestProductsOptions);

        expect(request.issuedAt.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    it("Deve definir a data de devolução da solicitação", () => {
        const returnDate = "2024-01-21T00:00:00.000Z";

        const request = Request.create(requestProductsOptions);

        expect(request.returnDate.getTime()).toEqual(new Date(returnDate).getTime());
    });

    it("Deve adicionar os artigos a solicitação", () => {
        const request = Request.create(requestProductsOptions);

        request.addItems(requestItems);

        expect(request.items.length).toEqual(3);
    });

    it("Deve calcular o valor total da solicitação", () => {
        const total = "1050,00";
        const request = Request.create(requestProductsOptions);

        request.addItems(requestItems);

        expect(request.getTotal().value).toEqual(total);
    });

    it("Deve calcular o valor total da linha com base na quantidade de artigos solicitados", () => {
        const request = Request.create(requestProductsOptions);

        request.addItems(requestItems);

        const requestLine = request.items[0];
        expect(requestLine.getTotal().value).toEqual("450,00");
    });

    it("Deve calcular o valor total da linha com base num preço com casas decimais", () => {
        const request = Request.create(requestProductsOptions);
        const product = Product.create({ ...productOptions, price: "1150,50" });
        const item = Item.create({ itemId: "some-id", product, condition });
        const requestItems = [
            RequestItem.create({
                item,
                quantity: 3,
            }),
        ];

        request.addItems(requestItems);

        const requestLine = request.items[0];

        expect(requestLine.getTotal().value).toEqual("3451,50");
    });

    it("Deve calcular o valor total da solicitação de uma linha, onde o total da linha tem casas decimais", () => {
        const product = Product.create({ ...productOptions, price: "1150,50" });
        const item = Item.create({ itemId: "some-id", product: product, condition });
        const requestLines = [
            RequestItem.create({
                item,
                quantity: 3,
            }),
        ];
        const requestedArticles = Request.create(requestProductsOptions);

        requestedArticles.addItems(requestLines);

        expect(requestedArticles.getTotal().value).toEqual("3451,50");
    });

    it("Deve calcular o valor total de uma solicitação com várias linhas, onde o total de cada linha tem casas decimais", () => {
        const product1 = Product.create({ ...productOptions, price: "1150,50" });
        const product2 = Product.create({ ...productOptions, price: "1150,50" });
        const item1 = Item.create({ itemId: "some-id", product: product1, condition });
        const item2 = Item.create({ itemId: "some-id", product: product2, condition });
        const requestItems = [
            RequestItem.create({
                item: item1,
                quantity: 3,
            }),
            RequestItem.create({
                item: item2,
                quantity: 2,
            }),
        ];
        const request = Request.create(requestProductsOptions);

        request.addItems(requestItems);

        expect(request.getTotal().value).toEqual("5752,50");
    });

    it("Deve ser o dobro do valor total da solicitação o valor da caução a reter", () => {
        const request = Request.create(requestProductsOptions);

        request.addItems(requestItems);

        expect(request.getTotal().value).toEqual("1050,00");
        expect(request.getSecurityDeposit().value).toEqual("2100,00");
    });
});

const requestProductsOptions = {
    requestId: "some-id",
    purpose: { name: "Aluguer" },
    user: User.create("John Doe"),
    returnDate: "2024-01-21T00:00:00.000Z",
    total: "1050",
};

const productOptions = {
    productId: "some-id",
    name: "some-title",
    price: "150",
    unique: false,
    subcategory: "some-subcategory",
};
const condition = { status: ItemStatus.Bad, comment: "Some comment" };
const product = Product.create(productOptions);
const item = Item.create({
    itemId: "some-id",
    product,
    condition,
});

const requestItemOptions = {
    item,
    quantity: 3,
};

export const requestItems: RequestItem[] = [
    RequestItem.create(requestItemOptions),
    RequestItem.create({ ...requestItemOptions, quantity: 2 }),
    RequestItem.create({ ...requestItemOptions, quantity: 2 }),
];
