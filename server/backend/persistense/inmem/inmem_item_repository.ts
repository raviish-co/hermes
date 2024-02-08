import { ProductNotFound } from "../../domain/catalog/product_not_found_error";
import { ItemRepository } from "../../domain/catalog/item_repository";
import { Either, left, right } from "../../shared/either";
import { Pagination } from "../../shared/pagination";
import { ItemQuery } from "../../shared/types";
import { Item } from "../../domain/catalog/item";
import { ID } from "../../shared/id";

export class InmemItemRepository implements ItemRepository {
    #items: Record<string, Item> = {};

    getById(articleId: ID): Promise<Item> {
        return Promise.resolve(this.#items[articleId.toString()]);
    }

    getAll(queries: ItemQuery[]): Promise<Either<ProductNotFound, Item[]>> {
        const items = Object.values(this.#items);
        const articles: Item[] = [];

        for (const query of queries) {
            const filtered = items.find(
                (item) =>
                    item.product.productId.toString() === query.itemId.toString() &&
                    item.variations?.toString() === query.variations?.toString()
            );

            if (!filtered)
                return Promise.resolve(left(new ProductNotFound(query.itemId.toString())));

            articles.push(filtered);
        }
        return Promise.resolve(right(articles));
    }

    list(pageToken: number, perPage: number): Promise<Pagination<Item>> {
        const startIndex = (pageToken - 1) * perPage;

        const endIndex = startIndex + perPage;

        const result = this.records.slice(startIndex, endIndex);

        const total = Math.ceil(result.length / perPage);

        return Promise.resolve({
            pageToken,
            perPage,
            total,
            result,
        });
    }

    search(query: string, pageToken: number, perPage: number): Promise<Pagination<Item>> {
        const items = this.records.filter((item) => {
            return (
                item.product.name.toLowerCase().includes(query.toLowerCase()) ||
                item.product.productId.toString().includes(query)
            );
        });

        const startIndex = (pageToken - 1) * perPage;

        const endIndex = startIndex + perPage;

        const result = items.slice(startIndex, endIndex);

        const total = Math.ceil(result.length / perPage);

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

    last(): Promise<Item> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): Item[] {
        return Object.values(this.#items);
    }
}