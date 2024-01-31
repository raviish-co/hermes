import { RequestedItems, RequestStatus } from "../../domain/requests/requested_items";
import { Product, ProductStatus } from "../../domain/catalog/product";
import { RequestItem } from "../../domain/requests/request_item";
import { Item } from "../../domain/catalog/item";
import { describe, expect, it } from "vitest";
import { User } from "../../domain/user";

describe("Test Request Products", () => {
    it("should create the request products", () => {
        const requestArticles = RequestedItems.create(requestProductsOptions);

        expect(requestArticles.getStatus()).toEqual(RequestStatus.PENDING);
    });

    it("Deve garantir que a seção será definida caso a finalidade tenha seções", () => {
        const purpose = { name: "Lavandaria", section: "Interna" };
        const options = {
            ...requestProductsOptions,
            purpose: purpose,
        };

        const requestArticles = RequestedItems.create(options);

        expect(requestArticles.purpose).toEqual(purpose);
        expect(requestArticles.purpose.section).toBeDefined();
    });

    it("Deve garantir que a seção não será definida caso a finalidade não tenha seções", () => {
        const purpose = { name: "Aluguer" };

        const requestArticles = RequestedItems.create(requestProductsOptions);

        expect(requestArticles.purpose).toEqual(purpose);
        expect(requestArticles.purpose.section).toBeUndefined();
    });

    it("Deve definir um destino a solicitação de saída de artigos", () => {
        const client = "John Doe";
        const purpose = { name: "Aluguer", recipient: client };
        const options = {
            ...requestProductsOptions,
            purpose: purpose,
        };

        const requestArticles = RequestedItems.create(options);

        expect(requestArticles.purpose.recipient).toBeDefined();
        expect(requestArticles.purpose.recipient).toEqual(client);
    });

    it("Deve garantir que o solicitante seja definido", () => {
        const user = User.create("John Doe");
        const options = {
            ...requestProductsOptions,
            user,
        };

        const requestArticles = RequestedItems.create(options);

        expect(requestArticles.user).toEqual(user);
    });

    it("Deve definir o momento que a solicitação foi efetuada", () => {
        const requestArticles = RequestedItems.create(requestProductsOptions);

        expect(requestArticles.issuedAt.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    it("Deve definir a data de devolução da solicitação", () => {
        const returnDate = "2024-01-21T00:00:00.000Z";

        const requestArticles = RequestedItems.create(requestProductsOptions);

        expect(requestArticles.returnDate.getTime()).toEqual(new Date(returnDate).getTime());
    });

    it("Deve adicionar os artigos a solicitação", () => {
        const requestArticles = RequestedItems.create(requestProductsOptions);

        requestArticles.addItems(requestLines);

        expect(requestArticles.items.length).toEqual(3);
    });

    it("Deve calcular o valor total da solicitação", () => {
        const total = "1050,00";
        const requestArticles = RequestedItems.create(requestProductsOptions);

        requestArticles.addItems(requestLines);

        expect(requestArticles.getTotal().value).toEqual(total);
    });

    it("Deve calcular o valor total da linha com base na quantidade de artigos solicitados", () => {
        const requestArticles = RequestedItems.create(requestProductsOptions);

        requestArticles.addItems(requestLines);

        const requestLine = requestArticles.items[0];
        expect(requestLine.getTotal().value).toEqual("450,00");
    });

    it("Deve calcular o valor total da linha com base num preço com casas decimais", () => {
        const requestArticles = RequestedItems.create(requestProductsOptions);
        const product = Product.create({ ...productOptions, price: "1150,50" });
        const item = new Item(product);
        const requestLines = [
            RequestItem.create({
                item,
                quantity: 3,
            }),
        ];

        requestArticles.addItems(requestLines);

        const requestLine = requestArticles.items[0];

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
        const requestLines = [
            RequestItem.create({
                item: item1,
                quantity: 3,
            }),
            RequestItem.create({
                item: item2,
                quantity: 2,
            }),
        ];
        const requestArticles = RequestedItems.create(requestProductsOptions);

        requestArticles.addItems(requestLines);

        expect(requestArticles.getTotal().value).toEqual("5752,50");
    });
});

const requestProductsOptions = {
    purpose: { name: "Aluguer" },
    user: User.create("John Doe"),
    returnDate: "2024-01-21T00:00:00.000Z",
    total: "1050",
};

// const options = {
//     attribute: new Attribute("Cor"),
//     variationValue: { value: "Vermelha" },
//     stock: 10,
// };

// const variation = new VariationGroup([Variation.create(options)]);

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

export const requestLines: RequestItem[] = [
    RequestItem.create(requestLineOptions),
    RequestItem.create({ ...requestLineOptions, quantity: 2 }),
    RequestItem.create({ ...requestLineOptions, quantity: 2 }),
];
