export class Article {
    readonly title: string;
    readonly price: number;
    #stock: number;

    private constructor(title: string, price: number, stock: number) {
        this.title = title;
        this.price = price;
        this.#stock = stock;
    }

    static create(title: string, price: number, stock: number): Article {
        return new Article(title, price, stock);
    }

    decreaseStock(quantity: number): void {
        this.#stock -= quantity;
    }

    getStock(): number {
        return this.#stock;
    }
}
