import { ItemNotFound } from "../../domain/catalog/item_not_found_error";
import { ItemRepository } from "../../domain/catalog/item_repository";
import { ItemCategory, ItemStatus } from "../../domain/catalog/item";
import { Variation } from "../../domain/catalog/variation";
import { ItemStock } from "../../domain/catalog/item_stock";
import { Either, left, right } from "../../shared/either";
import { Pagination } from "../../shared/pagination";
import { ItemQuery } from "../../shared/types";
import { ID } from "../../shared/id";

export class ItemRepositoryStub implements ItemRepository {
    #items: Record<string, ItemCategory> = {};

    constructor() {
        this.#populate();
    }

    getById(itemId: ID): Promise<ItemCategory> {
        return Promise.resolve(this.#items[itemId.toString()]);
    }

    getAll(queries: ItemQuery[]): Promise<Either<ItemNotFound, ItemCategory[]>> {
        const items: ItemCategory[] = [];

        for (const query of queries) {
            const filtered = this.records.find(
                (item) => item.itemId.toString() === query.itemId.toString()
            );

            if (!filtered) return Promise.resolve(left(new ItemNotFound(query.itemId.toString())));

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
        const variation = Variation.create({
            variationId: "1",
            attribute: { name: "Cor" },
            value: { value: "Preto" },
        });

        const variation1 = Variation.create({
            variationId: "9991",
            attribute: { name: "Marca" },
            value: { value: "Nike" },
        });

        const variation2 = Variation.create({
            variationId: "9992",
            attribute: { name: "Marca" },
            value: { value: "Rebock" },
        });

        const stock1 = new ItemStock(10);
        const stock2 = new ItemStock(10);
        const stock3 = new ItemStock(10);

        const item1 = ItemCategory.create({
            itemId: "1001",
            name: "T-shirt desportiva gola redonda",
            price: "4500,00",
            categoryId: ID.RandomUUID(),
            condition: { status: ItemStatus.Good },
            stock: stock1,
            variations: [variation, variation1],
        });

        const item2 = ItemCategory.create({
            itemId: "1002",
            name: "Sapato social",
            price: "15500,00",
            categoryId: ID.RandomUUID(),
            condition: { status: ItemStatus.Good },
            stock: stock2,
            variations: [variation],
        });

        const item3 = ItemCategory.create({
            itemId: "1003",
            name: "Calça jeans",
            price: "5500,00",
            categoryId: ID.RandomUUID(),
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
