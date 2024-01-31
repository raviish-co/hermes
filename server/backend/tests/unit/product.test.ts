import { describe, expect, it } from "vitest";
import { Product, ProductStatus } from "../../domain/catalog/product";

describe("Test Product", () => {
    it("Deve criar um produto", () => {
        const name = "some-name";
        const price = "150,00";

        const product = Product.create(options);

        expect(product.name).toEqual(name);
        expect(product.price.value).toEqual(price);
        expect(product.isUnique()).toBeFalsy();
    });

    it("Deve criar um produto único", () => {
        const unique = true;

        const product = Product.create({ ...options, unique });

        expect(product.isUnique()).toBeTruthy();
    });

    it("Deve definir a condição actual de um produto", () => {
        const product = Product.create(options);

        const condition = product.getCondition();

        expect(condition.status).toEqual(ProductStatus.Bad);
        expect(condition.comment).toBeDefined();
        expect(condition.comment).toEqual("Some comment");
    });

    it("Quando o artigo está em bom estado, não deve ter comentário", () => {
        const article = Product.create({ ...options, condition: { status: ProductStatus.Good } });

        const condition = article.getCondition();

        expect(condition.status).toEqual(ProductStatus.Good);
        expect(condition.comment).toBeUndefined();
    });
});

const condition = {
    status: ProductStatus.Bad,
    comment: "Some comment",
};

const options = {
    productId: "1001",
    name: "some-name",
    price: "150",
    unique: false,
    condition: condition,
};
