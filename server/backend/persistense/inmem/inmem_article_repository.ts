import { Product } from "../../domain/products/product";
import { Either, left, right } from "../../shared/either";
import { ID } from "../../shared/id";
import { ProductNotFound } from "../../domain/products/product_not_found_error";
import { ProductQuery, ItemRepository } from "../../domain/products/item_repository";
import { Pagination } from "../../shared/pagination";
import { Item } from "../../domain/products/item";

export class InmemItemRepository implements ItemRepository {
    #data: Record<string, Product> = {};
    #items: Record<string, Item> = {};

    constructor() {
        this.#data = {};
    }

    getById(articleId: ID): Promise<Product> {
        return Promise.resolve(this.#data[articleId.toString()]);
    }

    getAll(queries: ProductQuery[]): Promise<Either<ProductNotFound, Item[]>> {
        const items = Object.values(this.#items);
        const articles: Item[] = [];

        for (const query of queries) {
            const filtered = items.find(
                (item) =>
                    item.product.articleId.toString() === query.productId.toString() &&
                    item.variations?.toString() === query.variations?.toString()
            );

            if (!filtered)
                return Promise.resolve(left(new ProductNotFound(query.productId.toString())));

            articles.push(filtered);
        }
        return Promise.resolve(right(articles));
    }

    list(pageToken: number, perPage: number): Promise<Pagination<Product>> {
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

    search(query: string, pageToken: number, perPage: number): Promise<Pagination<Product>> {
        const articles = this.records.filter((a) => {
            return (
                a.title.toLowerCase().includes(query.toLowerCase()) ||
                a.articleId.toString().includes(query)
            );
        });

        const startIndex = (pageToken - 1) * perPage;

        const endIndex = startIndex + perPage;

        const result = articles.slice(startIndex, endIndex);

        const total = Math.ceil(result.length / perPage);

        return Promise.resolve({
            pageToken,
            perPage,
            total,
            result,
        });
    }

    get records(): Product[] {
        return Object.values(this.#data);
    }
}
