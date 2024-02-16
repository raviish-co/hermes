import { Item, ItemStatus } from "../../domain/catalog/item";
import { ItemStock } from "../../domain/catalog/item_stock";
import { describe, expect, it } from "vitest";
import { ID } from "../../shared/id";

describe("Test item", () => {
    it("Deve criar um item", () => {
        const item = Item.create(itemData);

        expect(item.itemId).toBeDefined();
        expect(item.name).toEqual("Teste");
        expect(item.price.value).toEqual("100,00");
    });

    it("Deve criar um item único", () => {
        const item = Item.create({ ...itemData, unique: true });

        expect(item.isUnique()).toBeTruthy();
        expect(item.getStock().getQuantity()).toEqual(1);
    });
});

const itemData = {
    categoryId: ID.RandomUUID(),
    itemId: "",
    name: "Teste",
    price: "100",
    unique: true,
    condition: {
        status: ItemStatus.Good,
        comment: undefined,
    },
    stock: new ItemStock(10),
};
