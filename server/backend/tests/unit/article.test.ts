import { describe, expect, it } from "vitest";
import { Article, ArticleStatus } from "../../domain/articles/article";
import { Decimal } from "../../shared/decimal";
import { Variation } from "../../domain/variation";
import { Attribute } from "../../domain/articles/attribute";
import { VariationGroup } from "../../domain/variation_group";

describe("Test Request Articles", () => {
    it("Deve criar um artigo", () => {
        const title = "some-title";
        const price = "150";

        const article = Article.create(options);

        expect(article.title).toEqual(title);
        expect(article.price).toEqual(Decimal.fromString(price));
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

    it("Um artigo deve ter o valor da calção a reter", () => {
        const article = Article.create({ ...options, securityDeposit: "150", unique: false });

        expect(article.getSecurityDeposit()).toEqual(Decimal.fromString("150"));
    });

    it("Deve definir a condição actual de um artigo", () => {
        const article = Article.create(options);

        const condition = article.getCondition();

        expect(condition.status).toEqual(ArticleStatus.Bad);
        expect(condition.comment).toBeDefined();
        expect(condition.comment).toEqual("Some comment");
    });

    it("Quando o artigo está em bom estado, não deve ter comentário", () => {
        const article = Article.create({ ...options, condition: { status: ArticleStatus.Good } });

        const condition = article.getCondition();

        expect(condition.status).toEqual(ArticleStatus.Good);
        expect(condition.comment).toBeUndefined();
    });

    it("Deve criar um artigo com uma variação", () => {
        const article = Article.create(options);

        const variations = article.getVariationGroup();
        expect(variations?.length).toEqual(1);
        expect(variations?.at(0)).toBeInstanceOf(VariationGroup);
    });

    it("Quando um artigo é único não deve ter variações", () => {
        const article = Article.create({ ...options, unique: true, variationGroup: undefined });

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

const color = new Attribute("Cor");
const size = new Attribute("Tamanho");
const red = { value: "Vermelha" };

const variationOptions = {
    attribute: color,
    variationValue: red,
    stock: 10,
};

const variationOptions1 = {
    attribute: size,
    variationValue: { value: "M" },
    stock: 10,
};

const colorVariation = Variation.create(variationOptions);
const sizeVariation = Variation.create(variationOptions1);
const group = new VariationGroup([colorVariation]);
const condition = {
    status: "Mau",
    comment: "Some comment",
};

const options = {
    title: "some-title",
    price: "150",
    stock: 10,
    unique: false,
    securityDeposit: "150",
    condition: condition,
    variationGroup: [group],
};
