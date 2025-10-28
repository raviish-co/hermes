import { Item } from "../../domain/catalog/items/item";
import { ItemNotFound } from "../../domain/catalog/items/item_not_found_error";
import type { ItemRepository } from "../../domain/catalog/items/item_repository";
import { type Either, left, right } from "../../shared/either";
import { ID } from "../../shared/id";
import type { Pagination, PaginatorOptions } from "../../shared/pagination";

export class InmemItemRepository implements ItemRepository {
    #items: Record<string, Item> = {};

    constructor(items?: Item[]) {
        if (!items) return;

        items.forEach(this.save.bind(this));
    }

    async getAll(opts?: PaginatorOptions): Promise<Pagination<Item>> {
        if (!opts) {
            const items = this.records.sort((a, b) => b.itemId.localeCompare(a.itemId.toString()));

            return {
                result: items,
                perPage: 0,
                pageToken: 0,
                total: 0,
            };
        }

        const startIndex = (opts.pageToken - 1) * opts.perPage;

        const endIndex = startIndex + opts.perPage;

        const result = this.records
            .sort((a, b) => b.itemId.localeCompare(a.itemId.toString()))
            .slice(startIndex, endIndex);

        const total = Math.ceil(this.records.length / opts.perPage);

        return {
            pageToken: opts.pageToken,
            perPage: opts.perPage,
            total,
            result,
        };
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

    async search(query: string, opts: PaginatorOptions): Promise<Pagination<Item>> {
        const items = this.records.filter((i) => {
            return (
                i.name.toLowerCase().includes(query.toLowerCase()) ||
                i.itemId.toString().toLowerCase().includes(query.toLowerCase()) ||
                i.fulltext.includes(query.toLowerCase())
            );
        });

        const startIndex = (opts.pageToken - 1) * opts.perPage;

        const endIndex = startIndex + opts.perPage;

        const result = items.slice(startIndex, endIndex);

        const total = Math.ceil(items.length / opts.perPage);

        return {
            pageToken: opts.pageToken,
            perPage: opts.perPage,
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
