import { ItemNotFound } from "../../domain/catalog/item_not_found_error";
import { ItemRepository } from "../../domain/catalog/item_repository";
import { Either, left, right } from "../../shared/either";
import { Pagination } from "../../shared/pagination";
import { ItemQuery } from "../../shared/types";
import { ItemCategory } from "../../domain/catalog/item";
import { ID } from "../../shared/id";

export class InmemItemRepository implements ItemRepository {
    #items: Record<string, ItemCategory> = {};

    getById(articleId: ID): Promise<ItemCategory> {
        return Promise.resolve(this.#items[articleId.toString()]);
    }

    getAll(queries: ItemQuery[]): Promise<Either<ItemNotFound, ItemCategory[]>> {
        const items = Object.values(this.#items);
        const articles: ItemCategory[] = [];

        for (const query of queries) {
            const filtered = items.find(
                (item) =>
                    item.itemId.toString() === query.itemId.toString() &&
                    item.variations?.toString() === query.variations?.toString()
            );

            if (!filtered) return Promise.resolve(left(new ItemNotFound(query.itemId.toString())));

            articles.push(filtered);
        }
        return Promise.resolve(right(articles));
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

    last(): Promise<ItemCategory> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): ItemCategory[] {
        return Object.values(this.#items);
    }
}
