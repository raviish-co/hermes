import { describe, expect, it } from "vitest";
import { RequestArticles, RequestStatus } from "../../domain/request_articles";
import { RequestLine } from "../../domain/request_line";
import { Article } from "../../domain/article";
import { User } from "../../domain/user";
import { VariationGroup } from "../../domain/variation_group";
import { Attribute } from "../../domain/attribute";
import { Variation } from "../../domain/variation";

describe("Test Request Articles", () => {
    it("should create the article request", () => {
        const requestArticles = RequestArticles.create(requestArticlesOptions);

        expect(requestArticles.getStatus()).toEqual(RequestStatus.PENDING);
    });

    it("Deve garantir que a seção será definida caso a finalidade tenha seções", () => {
        const purpose = { name: "Lavandaria", section: "Interna" };
        const options = {
            ...requestArticlesOptions,
            purposeOptions: purpose,
        };

        const requestArticles = RequestArticles.create(options);

        expect(requestArticles.purpose).toEqual(purpose);
        expect(requestArticles.purpose.section).toBeDefined();
    });

    it("Deve garantir que a seção não será definida caso a finalidade não tenha seções", () => {
        const purpose = { name: "Aluguer" };

        const requestArticles = RequestArticles.create(requestArticlesOptions);

        expect(requestArticles.purpose).toEqual(purpose);
        expect(requestArticles.purpose.section).toBeUndefined();
    });

    it("Deve definir um destino a solicitação de saída de artigos", () => {
        const client = "John Doe";
        const purpose = { name: "Aluguer", destination: client };
        const options = {
            ...requestArticlesOptions,
            purposeOptions: purpose,
        };

        const requestArticles = RequestArticles.create(options);

        expect(requestArticles.purpose.destination).toBeDefined();
        expect(requestArticles.purpose.destination).toEqual(client);
    });

    it("Deve garantir que o solicitante seja definido", () => {
        const user = User.create("John Doe");
        const options = {
            ...requestArticlesOptions,
            user,
        };

        const requestArticles = RequestArticles.create(options);

        expect(requestArticles.user).toEqual(user);
    });

    it("Deve definir o momento que a solicitação foi efetuada", () => {
        const requestArticles = RequestArticles.create(requestArticlesOptions);

        expect(requestArticles.issuedAt.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    it("Deve definir a data de devolução da solicitação", () => {
        const returnDate = "2024-01-21T00:00:00.000Z";

        const requestArticles = RequestArticles.create(requestArticlesOptions);

        expect(requestArticles.returnDate.getTime()).toEqual(new Date(returnDate).getTime());
    });

    it("Deve adicionar os artigos a solicitação", () => {
        const requestArticles = RequestArticles.create(requestArticlesOptions);

        requestArticles.addRequestLines(requestLines);

        expect(requestArticles.requestLines.length).toEqual(3);
    });

    it("Deve calcular o valor total da solicitação", () => {
        const total = "1050";
        const requestArticles = RequestArticles.create(requestArticlesOptions);

        requestArticles.addRequestLines(requestLines);

        const requestLine = requestArticles.requestLines[0];
        expect(requestArticles.getTotal().value).toEqual(total);
    });

    it("Deve calcular o valor total da linha com base na quantidade de artigos solicitados", () => {
        const requestArticles = RequestArticles.create(requestArticlesOptions);

        requestArticles.addRequestLines(requestLines);

        const requestLine = requestArticles.requestLines[0];
        expect(requestLine.getTotal().value).toEqual("450");
    });

    it("Deve calcular o valor total da linha com base num preço com casas decimais", () => {
        const requestArticles = RequestArticles.create(requestArticlesOptions);
        const article = Article.create({ ...articleOptions, price: "1150,50" });
        const requestLines = [
            RequestLine.create({
                article,
                quantity: 3,
            }),
        ];

        requestArticles.addRequestLines(requestLines);

        const requestLine = requestArticles.requestLines[0];

        expect(requestLine.getTotal().value).toEqual("3451,50");
    });

    it("Deve calcular o valor total da solicitação de uma linha, onde o total da linha tem casas decimais", () => {
        const requestLines = [
            RequestLine.create({
                article: Article.create({ ...articleOptions, price: "1150,50" }),
                quantity: 3,
            }),
        ];
        const requestArticles = RequestArticles.create(requestArticlesOptions);

        requestArticles.addRequestLines(requestLines);

        expect(requestArticles.getTotal().value).toEqual("3451,50");
    });

    it("Deve calcular o valor total de uma solicitação com várias linhas, onde o total de cada linha tem casas decimais", () => {
        const requestLines = [
            RequestLine.create({
                article: Article.create({ ...articleOptions, price: "1150,50" }),
                quantity: 3,
            }),
            RequestLine.create({
                article: Article.create({ ...articleOptions, price: "1150,50" }),
                quantity: 2,
            }),
        ];
        const requestArticles = RequestArticles.create(requestArticlesOptions);

        requestArticles.addRequestLines(requestLines);

        expect(requestArticles.getTotal().value).toEqual("5752,50");
    });
});

const requestArticlesOptions = {
    purposeOptions: { name: "Aluguer" },
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

const articleOptions = {
    title: "some-title",
    price: "150",
    unique: false,
    securityDeposit: "150",
    condition: { status: "Mau", comment: "Some comment" },
    variations: [variation],
};

const requestLineOptions = {
    article: Article.create(articleOptions),
    quantity: 3,
};

export const requestLines: RequestLine[] = [
    RequestLine.create(requestLineOptions),
    RequestLine.create({ ...requestLineOptions, quantity: 2 }),
    RequestLine.create({ ...requestLineOptions, quantity: 2 }),
];
