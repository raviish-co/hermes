import { ID } from "../tests/integration/service.test";
import { Amount } from "./amount";
import { VariationGroup } from "./variation_group";

export enum ArticleState {
    Good = "Bom",
    Bad = "Mau",
}

export type ArticleCondition = {
    status: string;
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
    readonly price: Amount;
    readonly condition: ArticleCondition;
    variationGroup?: VariationGroup[];
    #unique?: boolean;
    #securityDeposit: Amount;

    private constructor(
        articleId: ID,
        title: string,
        price: Amount,
        securityDeposit: Amount,
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

        const price = Amount.fromString(options.price);

        const securityDeposit = Amount.fromString(options.securityDeposit);

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

    getSecurityDeposit(): Amount {
        return this.#securityDeposit;
    }

    getCondition(): ArticleCondition {
        return this.condition;
    }

    getVariationGroup(): VariationGroup[] | undefined {
        return this.variationGroup;
    }
}
