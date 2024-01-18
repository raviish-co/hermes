import { describe, expect, it } from "vitest";
import { Article, ArticleState } from "../../domain/article";

describe("Test Request Articles", () => {
    it("Deve criar um artigo", () => {
        const title = "some-title";
        const price = 150;

        const article = Article.create(options);

        expect(article.title).toEqual(title);
        expect(article.price).toEqual(price);
        expect(article.getStock()).toEqual(10);
    });

    it("Deve criar um artigo único", () => {
        const unique = true;

        const article = Article.create({ ...options, unique });

        expect(article.isUnique()).toBeTruthy();
    });

    it("Deve criar um artigo que não seja único", () => {
        const article = Article.create(options);

        expect(article.isUnique()).toBeFalsy();
    });

    it("Deve ser 1 a quantidade em stock de um artigo único", () => {
        const article = Article.create({ ...options, unique: true });

        expect(article.getStock()).toEqual(1);
    });

    it("Deve aumentar a quantidade em stock de um artigo", () => {
        const article = Article.create(options);

        article.increaseStock(3);

        expect(article.getStock()).toEqual(13);
    });

    it("Deve retirar a quantidade exacta do artigo no stock", () => {
        const article = Article.create(options);

        article.decreaseStock(3);

        expect(article.getStock()).toEqual(7);
    });

    it("Deve permanecer 1 a quantidade em stock de um artigo único", () => {
        const article = Article.create({ ...options, unique: true });

        article.increaseStock(3);

        expect(article.getStock()).toEqual(1);
    });

    it("Deve diminuir apenas uma unidade no stock para um artigo único", () => {
        const article = Article.create({ ...options, unique: true });

        article.decreaseStock(3);

        expect(article.getStock()).toEqual(0);
    });

    it("Um artigo deve ter o valor da calção a reter", () => {
        const article = Article.create({ ...options, securityDeposit: 150, unique: false });

        expect(article.getSecurityDeposit()).toEqual(150);
    });

    it("Deve definir a condição actual de um artigo", () => {
        const article = Article.create(options);

        const condition = article.getCondition();

        expect(condition.status).toEqual(ArticleState.Bad);
        expect(condition.comment).toBeDefined();
        expect(condition.comment).toEqual("Some comment");
    });

    it("Quando o artigo está em bom estado, não deve ter comentário", () => {
        const article = Article.create({ ...options, condition: { status: ArticleState.Good } });

        const condition = article.getCondition();

        expect(condition.status).toEqual(ArticleState.Good);
        expect(condition.comment).toBeUndefined();
    });

    it("Deve criar um artigo com uma variação", () => {
        const article = Article.create(options);

        const variations = article.getVariationGroup();
        expect(variations?.length).toEqual(1);
        expect(variations?.at(0)).toBeInstanceOf(VariationGroup);
    });

    it("Quando um artigo é único não deve ter variações", () => {
        const article = Article.create({ ...options, unique: true });

        expect(article.variationGroup).toBeUndefined();
    });

    it("Deve criar um artigo com uma variação **Cor: Vermelha**", () => {
        const variationGroup = new VariationGroup([colorVariation]);

        const article = Article.create({ ...options, variationGroup: [variationGroup] });

        const group = article.getVariationGroup();
        expect(group?.length).toEqual(1);
        expect(group?.at(0)?.variations.at(0)?.attribute.name).toEqual(color.name);
        expect(group?.at(0)?.variations.at(0)?.value).toEqual(colorVariation.value);
    });

    it("Deve criar um artigo com duas variações", () => {
        const group1 = new VariationGroup([colorVariation]);
        const group2 = new VariationGroup([sizeVariation]);

        const article = Article.create({ ...options, variationGroup: [group1, group2] });

        const groups = article.getVariationGroup();
        expect(groups?.length).toEqual(2);
        expect(groups?.at(0)?.variations.at(0)?.attribute.name).toEqual(color.name);
        expect(groups?.at(0)?.variations.at(0)?.value).toEqual(colorVariation.value);
        expect(groups?.at(1)?.variations.at(0)?.attribute.name).toEqual(size.name);
        expect(groups?.at(1)?.variations.at(0)?.value).toEqual(sizeVariation.value);
    });

    it("Deve criar um artigo com uma variação **Cor: Vermelha** e **Tamanho: M**", () => {
        const variationGroup = new VariationGroup([colorVariation, sizeVariation]);

        const article = Article.create({ ...options, variationGroup: [variationGroup] });

        const group = article.getVariationGroup();
        expect(group?.length).toEqual(1);
        expect(group?.at(0)?.variations.length).toEqual(2);
        expect(group?.at(0)?.variations.at(0)?.attribute).toEqual(color);
        expect(group?.at(0)?.variations.at(0)?.value).toEqual(colorVariation.value);
        expect(group?.at(0)?.variations.at(1)?.attribute).toEqual(size);
        expect(group?.at(0)?.variations.at(1)?.value).toEqual(sizeVariation.value);
    });
});

export class Variation {
    readonly attribute: Attribute;
    readonly value: string;

    constructor(attribute: Attribute, value: string) {
        this.attribute = attribute;
        this.value = value;
    }
}

export class Attribute {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class VariationGroup {
    readonly variations: Variation[];

    constructor(variations: Variation[]) {
        this.variations = variations;
    }
}

const color = new Attribute("Cor");
const colorVariation = new Variation(color, "Vermelha");
const size = new Attribute("Tamanho");
const sizeVariation = new Variation(size, "M");
const group = new VariationGroup([colorVariation]);
const condition = {
    status: "Mau",
    comment: "Some comment",
};

const options = {
    title: "some-title",
    price: 150,
    stock: 10,
    unique: false,
    securityDeposit: 150,
    condition: condition,
    variationGroup: [group],
};
