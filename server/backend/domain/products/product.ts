import { ID } from "../../shared/id";
import { Decimal } from "../../shared/decimal";
import { VariationGroup } from "../variations/variation_group";

export enum ArticleStatus {
    Good = "Bom",
    Bad = "Mau",
}

export type ArticleCondition = {
    status: ArticleStatus;
    comment?: string;
};

export type ArticleOptions = {
    articleId: string;
    title: string;
    price: string;
    unique?: boolean;
    securityDeposit: string;
    condition: ArticleCondition;
    variationGroup?: VariationGroup[];
};

export class Product {
    readonly articleId: ID;
    readonly title: string;
    readonly price: Decimal;
    readonly condition: ArticleCondition;
    variationGroup?: VariationGroup[];
    #unique?: boolean;
    #securityDeposit: Decimal;
    #stock: number;

    private constructor(
        articleId: ID,
        title: string,
        price: Decimal,
        securityDeposit: Decimal,
        condition: ArticleCondition,
        variations?: VariationGroup[]
    ) {
        this.title = title;
        this.price = price;
        this.condition = condition;
        this.#unique = false;
        this.#securityDeposit = securityDeposit;
        this.variationGroup = variations;
        this.articleId = articleId;
        this.#stock = 10;
    }

    static create(options: ArticleOptions): Product {
        const { articleId, title, unique, condition, variationGroup } = options;

        const price = Decimal.fromString(options.price);

        const securityDeposit = Decimal.fromString(options.securityDeposit);

        const newID = ID.New(articleId);

        const article = new Product(newID, title, price, securityDeposit, condition);

        if (unique) {
            article.#unique = unique;
            return article;
        }

        article.variationGroup = variationGroup;

        return article;
    }

    isUnique(): boolean {
        return this.#unique == true;
    }

    verifyStock(quantity: number): boolean {
        return this.getStock() < quantity;
    }

    decreaseStock(quantity: number): void {
        this.#stock -= quantity;
    }

    getSecurityDeposit(): Decimal {
        return this.#securityDeposit;
    }

    getCondition(): ArticleCondition {
        return this.condition;
    }

    getVariationGroup(): VariationGroup[] | undefined {
        return this.variationGroup;
    }

    getStock(): number {
        return this.#stock;
    }
}
