import type { ItemCategoryRepository } from "@backend/domain/catalog/item_category_repository";
import { ItemCategoryNotFound } from "@backend/domain/catalog/item_category_not_found_error";
import { ItemCategory } from "@backend/domain/catalog/item_category";
import { type Either, left, right } from "@backend/shared/either";
import type { Pagination } from "@backend/shared/pagination";
import type { ItemQuery } from "@backend/shared/types";
import { ID } from "@backend/shared/id";

export class InmemItemCategoryRepository implements ItemCategoryRepository {
    #items: Record<string, ItemCategory> = {};

    getById(itemCategoryId: ID): Promise<ItemCategory> {
        return Promise.resolve(this.#items[itemCategoryId.toString()]);
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

    last(): Promise<ItemCategory> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): ItemCategory[] {
        return Object.values(this.#items);
    }
}
