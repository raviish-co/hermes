import type { ItemRepository as ItemRepository } from "../../domain/catalog/items/item_repository";
import { ItemNotFound } from "../../domain/catalog/items/item_not_found_error";
import { type Either, left, right } from "../../shared/either";
import type { Pagination } from "../../shared/pagination";
import { Item } from "../../domain/catalog/items/item";
import { ID } from "../../shared/id";

export class InmemItemRepository implements ItemRepository {
    #items: Record<string, Item> = {};

    constructor(items?: Item[]) {
        if (!items) return;

        items.forEach((item) => {
            this.#items[item.itemId.toString()] = item;
        });
    }

    async getAll(): Promise<Item[]> {
        return this.records;
    }

    async getById(itemId: ID): Promise<Either<ItemNotFound, Item>> {
        const item = this.records.find((item) => item.itemId.equals(itemId));
        if (!item) return left(new ItemNotFound());
        return right(item);
    }

    async findAll(queries: ID[]): Promise<Either<ItemNotFound, Item[]>> {
        const items: Item[] = [];

        for (const query of queries) {
            const filtered = this.records.find(
                (item) => item.itemId.toString() === query.toString()
            );

            if (!filtered) return left(new ItemNotFound());

            items.push(filtered);
        }
        return right(items);
    }

    async list(pageToken: number, perPage: number): Promise<Pagination<Item>> {
        const startIndex = (pageToken - 1) * perPage;

        const endIndex = startIndex + perPage;

        const result = this.records.slice(startIndex, endIndex);

        const total = Math.ceil(this.records.length / perPage);

        return {
            pageToken,
            perPage,
            total,
            result,
        };
    }

    async search(query: string, pageToken: number, perPage: number): Promise<Pagination<Item>> {
        const items = this.records.filter((i) => {
            return (
                i.name.toLowerCase().includes(query.toLowerCase()) ||
                i.itemId.toString().toLowerCase().includes(query.toLowerCase()) ||
                i.fulltext.includes(query.toLowerCase())
            );
        });

        const startIndex = (pageToken - 1) * perPage;

        const endIndex = startIndex + perPage;

        const result = items.slice(startIndex, endIndex);

        const total = Math.ceil(items.length / perPage);

        return {
            pageToken,
            perPage,
            total,
            result,
        };
    }

    async save(item: Item): Promise<void> {
        this.#items[item.itemId.toString()] = item;
    }

    async updateAll(items: Item[]): Promise<void> {
        for (const item of items) {
            this.#items[item.itemId.toString()] = item;
        }
    }

    async update(item: Item): Promise<void> {
        this.#items[item.itemId.toString()] = item;
    }

    async saveAll(items: Item[]): Promise<void> {
        for (const item of items) {
            this.#items[item.itemId.toString()] = item;
        }
    }

    async last(): Promise<Item> {
        return this.records[this.records.length - 1];
    }

    get records(): Item[] {
        return Object.values(this.#items);
    }
}
