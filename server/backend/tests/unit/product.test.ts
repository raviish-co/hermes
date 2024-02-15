import { Category } from "../../domain/catalog/category";
import { describe, expect, it } from "vitest";

describe("Test Category", () => {
    it("Deve criar uma categoria", () => {
        const name = "some-name";

        const category = Category.create(name);

        expect(category.categoryId).toBeDefined();
        expect(category.name).toEqual(name);
    });
});
