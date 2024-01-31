import { RequestedItems, RequestStatus } from "../../domain/requests/requested_items";
import { Product, ProductStatus } from "../../domain/catalog/product";
import { RequestItem } from "../../domain/requests/request_item";
import { Item } from "../../domain/catalog/item";
import { describe, expect, it } from "vitest";
import { User } from "../../domain/user";

describe("Test Request Products", () => {
    it("should create the request products", () => {
        const requestedItems = RequestedItems.create(requestProductsOptions);

        expect(requestedItems.getStatus()).toEqual(RequestStatus.PENDING);
    });

    it("Deve garantir que a seção será definida caso a finalidade tenha seções", () => {
        const purpose = { name: "Lavandaria", section: "Interna" };
        const options = {
            ...requestProductsOptions,
            purpose: purpose,
        };

        const requestedItems = RequestedItems.create(options);

        expect(requestedItems.purpose).toEqual(purpose);
        expect(requestedItems.purpose.section).toBeDefined();
    });

    it("Deve garantir que a seção não será definida caso a finalidade não tenha seções", () => {
        const purpose = { name: "Aluguer" };

        const requestedItems = RequestedItems.create(requestProductsOptions);

        expect(requestedItems.purpose).toEqual(purpose);
        expect(requestedItems.purpose.section).toBeUndefined();
    });

    it("Deve definir um destino a solicitação de saída de artigos", () => {
        const client = "John Doe";
        const purpose = { name: "Aluguer", recipient: client };
        const options = {
            ...requestProductsOptions,
            purpose: purpose,
        };

        const requestedItems = RequestedItems.create(options);

        expect(requestedItems.purpose.recipient).toBeDefined();
        expect(requestedItems.purpose.recipient).toEqual(client);
    });

    it("Deve garantir que o solicitante seja definido", () => {
        const user = User.create("John Doe");
        const options = {
            ...requestProductsOptions,
            user,
        };

        const requestedItems = RequestedItems.create(options);

        expect(requestedItems.user).toEqual(user);
    });

    it("Deve definir o momento que a solicitação foi efetuada", () => {
        const requestedItems = RequestedItems.create(requestProductsOptions);

        expect(requestedItems.issuedAt.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    it("Deve definir a data de devolução da solicitação", () => {
        const returnDate = "2024-01-21T00:00:00.000Z";

        const requestedItems = RequestedItems.create(requestProductsOptions);

        expect(requestedItems.returnDate.getTime()).toEqual(new Date(returnDate).getTime());
    });

    it("Deve adicionar os artigos a solicitação", () => {
        const requestedItems = RequestedItems.create(requestProductsOptions);

        requestedItems.addItems(requestItems);

        expect(requestedItems.items.length).toEqual(3);
    });

    it("Deve calcular o valor total da solicitação", () => {
        const total = "1050,00";
        const requestedItems = RequestedItems.create(requestProductsOptions);

        requestedItems.addItems(requestItems);

        expect(requestedItems.getTotal().value).toEqual(total);
    });

    it("Deve calcular o valor total da linha com base na quantidade de artigos solicitados", () => {
        const requestedItems = RequestedItems.create(requestProductsOptions);

        requestedItems.addItems(requestItems);

        const requestLine = requestedItems.items[0];
        expect(requestLine.getTotal().value).toEqual("450,00");
    });

    it("Deve calcular o valor total da linha com base num preço com casas decimais", () => {
        const requestedItems = RequestedItems.create(requestProductsOptions);
        const product = Product.create({ ...productOptions, price: "1150,50" });
        const item = new Item(product);
        const requestLines = [
            RequestItem.create({
                item,
                quantity: 3,
            }),
        ];

        requestedItems.addItems(requestLines);

        const requestLine = requestedItems.items[0];

        expect(requestLine.getTotal().value).toEqual("3451,50");
    });

    it("Deve calcular o valor total da solicitação de uma linha, onde o total da linha tem casas decimais", () => {
        const item = new Item(Product.create({ ...productOptions, price: "1150,50" }));
        const requestLines = [
            RequestItem.create({
                item,
                quantity: 3,
            }),
        ];
        const requestedArticles = RequestedItems.create(requestProductsOptions);

        requestedArticles.addItems(requestLines);

        expect(requestedArticles.getTotal().value).toEqual("3451,50");
    });

    it("Deve calcular o valor total de uma solicitação com várias linhas, onde o total de cada linha tem casas decimais", () => {
        const item1 = new Item(Product.create({ ...productOptions, price: "1150,50" }));
        const item2 = new Item(Product.create({ ...productOptions, price: "1150,50" }));
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
        const requestedItems = RequestedItems.create(requestProductsOptions);

        requestedItems.addItems(requestItems);

        expect(requestedItems.getTotal().value).toEqual("5752,50");
    });

    it("Deve ser o dobro do valor total da solicitação o valor da caução a reter", () => {
        const requestedItems = RequestedItems.create(requestProductsOptions);

        requestedItems.addItems(requestItems);

        expect(requestedItems.getTotal().value).toEqual("1050,00");
        expect(requestedItems.getSecurityDeposit().value).toEqual("2100,00");
    });
});

const requestProductsOptions = {
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
    condition: { status: ProductStatus.Bad, comment: "Some comment" },
};

const requestLineOptions = {
    item: new Item(Product.create(productOptions)),
    quantity: 3,
};

export const requestItems: RequestItem[] = [
    RequestItem.create(requestLineOptions),
    RequestItem.create({ ...requestLineOptions, quantity: 2 }),
    RequestItem.create({ ...requestLineOptions, quantity: 2 }),
];
