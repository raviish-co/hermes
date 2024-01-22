import { Article } from "./article";
import { Amount } from "./amount";

export type RequestLineOptions = {
    article: Article;
    quantity: number;
};

export class RequestLine {
    readonly article: Article;
    readonly quantity: number;
    #total: Amount;

    private constructor(article: Article, quantity: number) {
        this.article = article;
        this.quantity = quantity;
        this.#total = Amount.fromString("0");
    }

    static create(options: RequestLineOptions): RequestLine {
        const { article, quantity } = options;
        const requestLine = new RequestLine(article, quantity);
        requestLine.#calculateTotal();
        return requestLine;
    }

    #calculateTotal(): void {
        const factor = Amount.fromString(this.quantity.toString());
        this.#total = this.article.price.multiply(factor);
    }

    getTotal(): Amount {
        return this.#total;
    }
}
