import { Article } from "../articles/article";
import { Decimal } from "../../shared/decimal";

export type ItemOptions = {
    article: Article;
    quantity: number;
};

export class RequestedItem {
    readonly article: Article;
    readonly quantity: number;
    #total: Decimal;

    private constructor(article: Article, quantity: number) {
        this.article = article;
        this.quantity = quantity;
        this.#total = Decimal.fromString("0");
    }

    static create(options: ItemOptions): RequestedItem {
        const { article, quantity } = options;
        const requestedItem = new RequestedItem(article, quantity);
        requestedItem.#calculateTotal();
        return requestedItem;
    }

    #calculateTotal(): void {
        const factor = Decimal.fromString(this.quantity.toString());
        this.#total = this.article.price.multiply(factor);
    }

    getTotal(): Decimal {
        return this.#total;
    }
}
