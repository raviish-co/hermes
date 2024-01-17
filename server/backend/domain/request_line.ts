import { a } from "vitest/dist/suite-6Pt_ep5V";
import { Article } from "./article";

export class RequestLine {
    readonly article: Article;
    readonly quantity: number;
    total: number;

    private constructor(article: Article, quantity: number) {
        this.article = article;
        this.quantity = quantity;
        this.total = 0;
    }

    static create(article: Article, quantity: number): RequestLine {
        article.decreaseStock(quantity);
        const requestLine = new RequestLine(article, quantity);
        requestLine.#calculateTotal();
        return requestLine;
    }

    #calculateTotal(): void {
        this.total = this.article.price * this.quantity;
    }
}
