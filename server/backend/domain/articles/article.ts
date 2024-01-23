import { ID } from "../../shared/id";
import { Decimal } from "../../shared/decimal";
import { VariationGroup } from "../variation_group";

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

export class Article {
    readonly articleId: ID;
    readonly title: string;
    readonly price: Decimal;
    readonly condition: ArticleCondition;
    variationGroup?: VariationGroup[];
    #unique?: boolean;
    #securityDeposit: Decimal;

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
    }

    static create(options: ArticleOptions): Article {
        const { articleId, title, unique, condition, variationGroup } = options;

        const price = Decimal.fromString(options.price);

        const securityDeposit = Decimal.fromString(options.securityDeposit);

        const newID = ID.New(articleId);

        const article = new Article(newID, title, price, securityDeposit, condition);

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

    getSecurityDeposit(): Decimal {
        return this.#securityDeposit;
    }

    getCondition(): ArticleCondition {
        return this.condition;
    }

    getVariationGroup(): VariationGroup[] | undefined {
        return this.variationGroup;
    }
}
