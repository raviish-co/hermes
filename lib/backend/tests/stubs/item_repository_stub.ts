import { ItemNotFound } from "../../domain/catalog/item_not_found_error";
import type { ItemRepository } from "../../domain/catalog/item_repository";
import { ItemBuilder } from "../../domain/catalog/item_builder";
import { type Either, left, right } from "../../shared/either";
import type { Pagination } from "../../shared/pagination";
import { Item } from "../../domain/catalog/item";
import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";
import { ItemStock } from "../../domain/catalog/item_stock";

export class ItemRepositoryStub implements ItemRepository {
    #items: Record<string, Item> = {};

    constructor() {
        this.#populate();
    }

    getById(itemId: ID): Promise<Item> {
        return Promise.resolve(this.#items[itemId.toString()]);
    }

    findAll(queries: ID[]): Promise<Either<ItemNotFound, Item[]>> {
        const items: Item[] = [];

        for (const query of queries) {
            const filtered = this.records.find(
                (item) => item.itemId.toString() === query.toString()
            );

            if (!filtered) return Promise.resolve(left(new ItemNotFound(query.toString())));

            items.push(filtered);
        }
        return Promise.resolve(right(items));
    }

    list(pageToken: number, perPage: number): Promise<Pagination<Item>> {
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

    search(query: string, pageToken: number, perPage: number): Promise<Pagination<Item>> {
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

    updateAll(items: Item[]): Promise<void> {
        for (const item of items) {
            this.#items[item.itemId.toString()] = item;
        }

        return Promise.resolve(undefined);
    }

    saveAll(items: Item[]): Promise<void> {
        for (const item of items) {
            this.#items[item.itemId.toString()] = item;
        }
        return Promise.resolve(undefined);
    }

    get records(): Item[] {
        return Object.values(this.#items);
    }

    last(): Promise<Item> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    #populate() {
        const item1 = new ItemBuilder()
            .withItemId("1001")
            .withName("T-shirt desportiva gola redonda")
            .withPrice(Decimal.fromString("4500,00"))
            .withCategoryId(ID.random())
            .withStock(10)
            .withGoodCondition()
            .withSectionId(ID.random())
            .withVariation(ID.fromString("1"), "Cor: Preto")
            .build();

        const item2 = new ItemBuilder()
            .withItemId("1002")
            .withName("Sapato social")
            .withPrice(Decimal.fromString("15500,00"))
            .withCategoryId(ID.random())
            .withStock(10)
            .withGoodCondition()
            .withSectionId(ID.random())
            .withVariation(ID.fromString("2"), "Marca: Nike")
            .build();

        const item3 = new ItemBuilder()
            .withItemId("1003")
            .withName("Calça jeans")
            .withPrice(Decimal.fromString("5500,00"))
            .withCategoryId(ID.random())
            .withStock(10)
            .withGoodCondition()
            .withSectionId(ID.random())
            .withVariation(ID.fromString("3"), "Tamanho: 42")
            .build();

        this.#items = {
            "1001": item1.value as Item,
            "1002": item2.value as Item,
            "1003": item3.value as Item,
        };
    }
}
