import { Product } from "../../domain/catalog/product";
import { describe, expect, it } from "vitest";
import { ID } from "../../shared/id";

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

    it("Deve criar um produto com a sua subcatergoria", () => {
        const product = Product.create(options);

        expect(product.subcategory).toBeDefined();
        expect(product.subcategory.name).toEqual("some-subcategory");
    });
});

const subcategory = {
    subcategoryId: ID.RandomUUID(),
    name: "some-subcategory",
};

const options = {
    name: "some-name",
    price: "150",
    unique: false,
    subcategory,
};
