import { VariationGroup } from "../tests/unit/article.test";

export enum ArticleState {
    Good = "Bom",
    Bad = "Mau",
}

export type Condition = {
    status: string;
    comment?: string;
};

export type ArticleOptions = {
    title: string;
    price: number;
    stock: number;
    unique?: boolean;
    securityDeposit: number;
    condition: Condition;
    variationGroup?: VariationGroup[];
};

export class Article {
    readonly title: string;
    readonly price: number;
    readonly condition: Condition;
    variationGroup?: VariationGroup[];
    #stock: number;
    #unique?: boolean;
    #securityDeposit: number;

    private constructor(
        title: string,
        price: number,
        stock: number,
        securityDeposit: number,
        condition: Condition
    ) {
        this.title = title;
        this.price = price;
        this.condition = condition;
        this.#stock = stock;
        this.#unique = false;
        this.#securityDeposit = securityDeposit;
    }

    static create(options: ArticleOptions): Article {
        const { title, price, stock, unique, securityDeposit, condition, variationGroup } = options;
        const article = new Article(title, price, stock, securityDeposit, condition);
        if (unique) {
            article.#unique = unique;
            article.#stock = 1;
            return article;
        }
        article.variationGroup = variationGroup;
        return article;
    }

    decreaseStock(quantity: number): void {
        if (this.isUnique()) {
            this.#stock -= 1;
            return;
        }
        this.#stock -= quantity;
    }

    isUnique(): boolean {
        return this.#unique == true;
    }

    increaseStock(quantity: number): void {
        if (this.isUnique()) return;
        this.#stock += quantity;
    }

    getStock(): number {
        return this.#stock;
    }

    getSecurityDeposit(): number {
        return this.#securityDeposit;
    }

    getCondition(): Condition {
        return this.condition;
    }

    getVariationGroup(): VariationGroup[] | undefined {
        return this.variationGroup;
    }
}
