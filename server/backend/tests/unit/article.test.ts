import { describe, expect, it } from "vitest";
import { Article } from "../../domain/article";

describe("Test Request Articles", () => {
    it("Deve criar um artigo", () => {
        const title = "some-title";
        const price = 150;
        const stock = 10;

        const article = Article.create("some-title", price, stock);

        expect(article.title).toEqual(title);
        expect(article.price).toEqual(price);
        expect(article.getStock()).toEqual(10);
    });

    it("Deve retirar a quantidade exacta de artigos no stock", () => {
        const article = Article.create("some-title", 150, 10);

        article.decreaseStock(3);

        expect(article.getStock()).toEqual(7);
    });
});
