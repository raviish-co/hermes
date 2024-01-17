import { describe, expect, it } from "vitest";
import { RequestArticles, RequestStatus } from "../../domain/request_articles";
import { RequestLine } from "../../domain/request_line";
import { Article } from "../../domain/article";
import { User } from "../../domain/user";

describe("Test Request Articles", () => {
    it("should create the article request", () => {
        const user = User.create("John Doe");
        const purpose = { name: "Aluguer" };
        const returnDate = "2024-01-21T00:00:00.000Z";

        const requestArticles = RequestArticles.create(purpose, user, returnDate);

        expect(requestArticles.getStatus()).toEqual(RequestStatus.PENDING);
    });

    it("Deve garantir que a seção será definida caso a finalidade tenha seções", () => {
        const user = User.create("John Doe");
        const purpose = { name: "Lavandaria", section: "Interna" };
        const returnDate = "2024-01-21T00:00:00.000Z";

        const requestArticles = RequestArticles.create(purpose, user, returnDate);

        expect(requestArticles.purpose).toEqual(purpose);
        expect(requestArticles.purpose.section).toBeDefined();
    });

    it("Deve garantir que a seção não será definida caso a finalidade não tenha seções", () => {
        const user = User.create("John Doe");
        const purpose = { name: "Aluguer" };
        const returnDate = "2024-01-21T00:00:00.000Z";

        const requestArticles = RequestArticles.create(purpose, user, returnDate);

        expect(requestArticles.purpose).toEqual(purpose);
        expect(requestArticles.purpose.section).toBeUndefined();
    });

    it("Deve definir a descrição da solicitação de saída de artigoss", () => {
        const user = User.create("John Doe");
        const client = "John Doe";
        const purpose = { name: "Aluguer", description: client };
        const returnDate = "2024-01-21T00:00:00.000Z";

        const requestArticles = RequestArticles.create(purpose, user, returnDate);

        expect(requestArticles.purpose.description).toBeDefined();
        expect(requestArticles.purpose.description).toEqual(client);
    });

    it("Deve garantir que o solicitante seja definido", () => {
        const user = User.create("John Doe");
        const purpose = { name: "Aluguer", description: "some description" };
        const returnDate = "2024-01-21T00:00:00.000Z";

        const requestArticles = RequestArticles.create(purpose, user, returnDate);

        expect(requestArticles.user).toEqual(user);
    });

    it("Deve definir o momento que a solicitação foi efetuada", () => {
        const user = User.create("John Doe");
        const purpose = { name: "Aluguer", description: "some description" };
        const returnDate = "2024-01-21T00:00:00.000Z";

        const requestArticles = RequestArticles.create(purpose, user, returnDate);

        expect(requestArticles.issuedAt.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    it("Deve definir a data de devolução da solicitação", () => {
        const user = User.create("John Doe");
        const purpose = { name: "Aluguer", description: "some description" };
        const returnDate = "2024-01-21T00:00:00.000Z";

        const requestArticles = RequestArticles.create(purpose, user, returnDate);

        expect(requestArticles.returnDate.getTime()).toEqual(new Date(returnDate).getTime());
    });

    it("Deve adicionar os artigos a solicitação", () => {
        const user = User.create("John Doe");
        const purpose = { name: "Aluguer", description: "some description" };
        const returnDate = "2024-01-21T00:00:00.000Z";
        const requestArticles = RequestArticles.create(purpose, user, returnDate);

        requestArticles.addRequestLines(requestLines);

        expect(requestArticles.requestLines.length).toEqual(3);
    });

    it("Deve calcular o valor total da solicitação", () => {
        const user = User.create("John Doe");
        const purpose = { name: "Aluguer", description: "some description" };
        const returnDate = "2024-01-21T00:00:00.000Z";
        const requestArticles = RequestArticles.create(purpose, user, returnDate);

        requestArticles.addRequestLines(requestLines);

        const requestLine = requestArticles.requestLines[0];
        const article = requestArticles.requestLines[0].article;

        expect(requestArticles.getTotal()).toEqual(1050);
        expect(requestLine.total).toEqual(450);
        expect(article.getStock()).toEqual(12);
    });
});

export const requestLines: RequestLine[] = [
    RequestLine.create(Article.create("some article 1", 150, 15), 3),
    RequestLine.create(Article.create("some article 2", 100, 10), 2),
    RequestLine.create(Article.create("some article 3", 200, 5), 2),
];
