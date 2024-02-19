import { ItemCategoryNotFound } from "../../domain/catalog/item_category_not_found_error";
import type { ItemCategoryRepository } from "../../domain/catalog/item_category_repository";
import { ItemCategory, ItemStatus } from "../../domain/catalog/item_category";
import { ItemCategoryStock } from "../../domain/catalog/item_category_stock";
import { Variation } from "../../domain/catalog/variation";
import { type Either, left, right } from "../../shared/either";
import type { Pagination } from "../../shared/pagination";
import type { ItemQuery } from "../../shared/types";
import { ID } from "../../shared/id";

export class ItemCategoryRepositoryStub implements ItemCategoryRepository {
    #items: Record<string, ItemCategory> = {};

    constructor() {
        this.#populate();
    }

    getById(itemId: ID): Promise<ItemCategory> {
        return Promise.resolve(this.#items[itemId.toString()]);
    }

    getAll(queries: ItemQuery[]): Promise<Either<ItemCategoryNotFound, ItemCategory[]>> {
        const items: ItemCategory[] = [];

        for (const query of queries) {
            const filtered = this.records.find(
                (item) => item.itemId.toString() === query.itemId.toString()
            );

            if (!filtered)
                return Promise.resolve(left(new ItemCategoryNotFound(query.itemId.toString())));

            items.push(filtered);
        }
        return Promise.resolve(right(items));
    }

    list(pageToken: number, perPage: number): Promise<Pagination<ItemCategory>> {
        const startIndex = (pageToken - 1) * perPage;

        const endIndex = startIndex + perPage;

        const result = this.records.slice(startIndex, endIndex);

        const total = Math.ceil(this.records.length / perPage);

        return Promise.resolve({
            pageToken,
            perPage,
            total,
            result,
        });
    }

    search(query: string, pageToken: number, perPage: number): Promise<Pagination<ItemCategory>> {
        const items = this.records.filter((i) => {
            return (
                i.name.toLowerCase().includes(query.toLowerCase()) ||
                i.itemId.toString().includes(query) ||
                i.fulltext.includes(query.toLowerCase())
            );
        });

        const startIndex = (pageToken - 1) * perPage;

        const endIndex = startIndex + perPage;

        const result = items.slice(startIndex, endIndex);

        const total = Math.ceil(items.length / perPage);

        return Promise.resolve({
            pageToken,
            perPage,
            total,
            result,
        });
    }

    updateAll(items: ItemCategory[]): Promise<void> {
        for (const item of items) {
            this.#items[item.itemId.toString()] = item;
        }

        return Promise.resolve(undefined);
    }

    saveAll(items: ItemCategory[]): Promise<void> {
        for (const item of items) {
            this.#items[item.itemId.toString()] = item;
        }
        return Promise.resolve(undefined);
    }

    get records(): ItemCategory[] {
        return Object.values(this.#items);
    }

    last(): Promise<ItemCategory> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    #populate() {
        const variation1 = new Variation(ID.random(), "Cor", ["Preto"]);
        const variation2 = new Variation(ID.random(), "Marca", ["Nike", "Adidas", "Rebock"]);

        const stock1 = new ItemCategoryStock(10);
        const stock2 = new ItemCategoryStock(10);
        const stock3 = new ItemCategoryStock(10);

        const item1 = ItemCategory.create({
            itemId: "1001",
            name: "T-shirt desportiva gola redonda",
            price: "4500,00",
            categoryId: ID.random(),
            condition: { status: ItemStatus.Good },
            stock: stock1,
            variations: [
                { variationId: variation1.variationId.toString(), value: "Preto" },
                { variationId: variation2.variationId.toString(), value: "Nike" },
            ],
        });

        const item2 = ItemCategory.create({
            itemId: "1002",
            name: "Sapato social",
            price: "15500,00",
            categoryId: ID.random(),
            condition: { status: ItemStatus.Good },
            stock: stock2,
            variations: [],
        });

        const item3 = ItemCategory.create({
            itemId: "1003",
            name: "Calça jeans",
            price: "5500,00",
            categoryId: ID.random(),
            condition: { status: ItemStatus.Good },
            stock: stock3,
        });

        this.#items = {
            "1001": item1,
            "1002": item2,
            "1003": item3,
        };
    }
}
