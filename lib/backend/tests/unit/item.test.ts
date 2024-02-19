import { ItemCategory, ItemStatus } from "@backend/domain/catalog/item_category";
import { ItemCategoryStock } from "@backend/domain/catalog/item_category_stock";
import { describe, expect, it } from "vitest";
import { ID } from "@backend/shared/id";

describe("Test item", () => {
    it("Deve criar um item", () => {
        const item = ItemCategory.create(itemData);

        expect(item.itemId).toBeDefined();
        expect(item.name).toEqual("Teste");
        expect(item.price.value).toEqual("100,00");
    });

    it("Deve criar um item único", () => {
        const item = ItemCategory.create({ ...itemData, unique: true });

        expect(item.isUnique()).toBeTruthy();
        expect(item.getStock().getQuantity()).toEqual(1);
    });
});

const itemData = {
    categoryId: ID.random(),
    itemId: "",
    name: "Teste",
    price: "100",
    unique: true,
    condition: {
        status: ItemStatus.Good,
        comment: undefined,
    },
    stock: new ItemCategoryStock(10),
};
