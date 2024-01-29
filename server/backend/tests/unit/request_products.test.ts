import { describe, expect, it } from "vitest";
import { RequestedArticles, RequestStatus } from "../../domain/requests/requested_articles";
import { RequestedItem } from "../../domain/requests/requested_item";
import { Product, ArticleStatus } from "../../domain/products/product";
import { User } from "../../domain/user";
import { VariationGroup } from "../../domain/variations/variation_group";
import { Attribute } from "../../domain/variations/attribute";
import { Variation } from "../../domain/variations/variation";
import { Item } from "../../domain/products/item";

describe("Test Request Products", () => {
    it("should create the request products", () => {
        const requestArticles = RequestedArticles.create(requestProductsOptions);

        expect(requestArticles.getStatus()).toEqual(RequestStatus.PENDING);
    });

    it("Deve garantir que a seção será definida caso a finalidade tenha seções", () => {
        const purpose = { name: "Lavandaria", section: "Interna" };
        const options = {
            ...requestProductsOptions,
            purpose: purpose,
        };

        const requestArticles = RequestedArticles.create(options);

        expect(requestArticles.purpose).toEqual(purpose);
        expect(requestArticles.purpose.section).toBeDefined();
    });

    it("Deve garantir que a seção não será definida caso a finalidade não tenha seções", () => {
        const purpose = { name: "Aluguer" };

        const requestArticles = RequestedArticles.create(requestProductsOptions);

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

        const requestArticles = RequestedArticles.create(options);

        expect(requestArticles.purpose.recipient).toBeDefined();
        expect(requestArticles.purpose.recipient).toEqual(client);
    });

    it("Deve garantir que o solicitante seja definido", () => {
        const user = User.create("John Doe");
        const options = {
            ...requestProductsOptions,
            user,
        };

        const requestArticles = RequestedArticles.create(options);

        expect(requestArticles.user).toEqual(user);
    });

    it("Deve definir o momento que a solicitação foi efetuada", () => {
        const requestArticles = RequestedArticles.create(requestProductsOptions);

        expect(requestArticles.issuedAt.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    it("Deve definir a data de devolução da solicitação", () => {
        const returnDate = "2024-01-21T00:00:00.000Z";

        const requestArticles = RequestedArticles.create(requestProductsOptions);

        expect(requestArticles.returnDate.getTime()).toEqual(new Date(returnDate).getTime());
    });

    it("Deve adicionar os artigos a solicitação", () => {
        const requestArticles = RequestedArticles.create(requestProductsOptions);

        requestArticles.addRequestedItems(requestLines);

        expect(requestArticles.requestedItems.length).toEqual(3);
    });

    it("Deve calcular o valor total da solicitação", () => {
        const total = "1050,00";
        const requestArticles = RequestedArticles.create(requestProductsOptions);

        requestArticles.addRequestedItems(requestLines);

        expect(requestArticles.getTotal().value).toEqual(total);
    });

    it("Deve calcular o valor total da linha com base na quantidade de artigos solicitados", () => {
        const requestArticles = RequestedArticles.create(requestProductsOptions);

        requestArticles.addRequestedItems(requestLines);

        const requestLine = requestArticles.requestedItems[0];
        expect(requestLine.getTotal().value).toEqual("450,00");
    });

    it("Deve calcular o valor total da linha com base num preço com casas decimais", () => {
        const requestArticles = RequestedArticles.create(requestProductsOptions);
        const product = Product.create({ ...productOptions, price: "1150,50" });
        const item = new Item(product);
        const requestLines = [
            RequestedItem.create({
                item,
                quantity: 3,
            }),
        ];

        requestArticles.addRequestedItems(requestLines);

        const requestLine = requestArticles.requestedItems[0];

        expect(requestLine.getTotal().value).toEqual("3451,50");
    });

    it("Deve calcular o valor total da solicitação de uma linha, onde o total da linha tem casas decimais", () => {
        const item = new Item(Product.create({ ...productOptions, price: "1150,50" }));
        const requestLines = [
            RequestedItem.create({
                item,
                quantity: 3,
            }),
        ];
        const requestedArticles = RequestedArticles.create(requestProductsOptions);

        requestedArticles.addRequestedItems(requestLines);

        expect(requestedArticles.getTotal().value).toEqual("3451,50");
    });

    it("Deve calcular o valor total de uma solicitação com várias linhas, onde o total de cada linha tem casas decimais", () => {
        const item1 = new Item(Product.create({ ...productOptions, price: "1150,50" }));
        const item2 = new Item(Product.create({ ...productOptions, price: "1150,50" }));
        const requestLines = [
            RequestedItem.create({
                item: item1,
                quantity: 3,
            }),
            RequestedItem.create({
                item: item2,
                quantity: 2,
            }),
        ];
        const requestArticles = RequestedArticles.create(requestProductsOptions);

        requestArticles.addRequestedItems(requestLines);

        expect(requestArticles.getTotal().value).toEqual("5752,50");
    });
});

const requestProductsOptions = {
    purpose: { name: "Aluguer" },
    user: User.create("John Doe"),
    returnDate: "2024-01-21T00:00:00.000Z",
    total: "1050",
};

const options = {
    attribute: new Attribute("Cor"),
    variationValue: { value: "Vermelha" },
    stock: 10,
};

const variation = new VariationGroup([Variation.create(options)]);

const productOptions = {
    articleId: "some-id",
    title: "some-title",
    price: "150",
    unique: false,
    securityDeposit: "150",
    condition: { status: ArticleStatus.Bad, comment: "Some comment" },
    variations: [variation],
};

const requestLineOptions = {
    item: new Item(Product.create(productOptions)),
    quantity: 3,
};

export const requestLines: RequestedItem[] = [
    RequestedItem.create(requestLineOptions),
    RequestedItem.create({ ...requestLineOptions, quantity: 2 }),
    RequestedItem.create({ ...requestLineOptions, quantity: 2 }),
];
