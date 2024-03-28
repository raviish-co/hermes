import type { ItemRepository as ItemRepository } from "../../domain/catalog/item_repository";
import { ItemNotFound } from "../../domain/catalog/item_not_found_error";
import { type Either, left, right } from "../../shared/either";
import type { Pagination } from "../../shared/pagination";
import { Item } from "../../domain/catalog/item";
import { ID } from "../../shared/id";

export class InmemItemRepository implements ItemRepository {
    #items: Record<string, Item> = {};

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

    save(item: Item): Promise<void> {
        this.#items[item.itemId.toString()] = item;
        return Promise.resolve(undefined);
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

    last(): Promise<Item> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): Item[] {
        return Object.values(this.#items);
    }
}
