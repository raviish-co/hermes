import { ProductNotFound } from "../../domain/catalog/product_not_found_error";
import { ItemRepository } from "../../domain/catalog/item_repository";
import { Product } from "../../domain/catalog/product";
import { Either, left, right } from "../../shared/either";
import { Pagination } from "../../shared/pagination";
import { ProductQuery } from "../../shared/types";
import { Item, ItemStatus } from "../../domain/catalog/item";
import { ID } from "../../shared/id";

export class ItemRepositoryStub implements ItemRepository {
    #items: Record<string, Item> = {};

    constructor() {
        this.#populate();
    }

    getById(itemId: ID): Promise<Item> {
        return Promise.resolve(this.#items[itemId.toString()]);
    }

    getAll(queries: ProductQuery[]): Promise<Either<ProductNotFound, Item[]>> {
        const items = Object.values(this.#items);
        const articles: Item[] = [];

        for (const query of queries) {
            const filtered = items.find(
                (item) => item.product.productId.toString() === query.productId.toString()
            );

            if (!filtered)
                return Promise.resolve(left(new ProductNotFound(query.productId.toString())));

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
        const items = this.records.filter((i) => {
            return (
                i.product.name.toLowerCase().includes(query.toLowerCase()) ||
                i.product.productId.toString().includes(query)
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

    get records(): Item[] {
        return Object.values(this.#items);
    }

    #populate() {
        const product = Product.create({
            productId: "1001",
            name: "Teste 1",
            price: "15,95",
            subcategory: "some-subcategory",
        });

        const product2 = Product.create({
            productId: "1002",
            name: "Teste 2",
            price: "150,95",
            subcategory: "some-subcategory",
        });

        const product3 = Product.create({
            productId: "1003",
            name: "Teste 2",
            price: "315,95",
            subcategory: "some-subcategory",
        });

        const item1 = Item.create({
            itemId: "1001",
            product,
            condition: { status: ItemStatus.Good },
        });

        const item2 = Item.create({
            itemId: "1002",
            product: product2,
            condition: { status: ItemStatus.Good },
        });

        const item3 = Item.create({
            itemId: "1003",
            product: product3,
            condition: { status: ItemStatus.Good },
        });

        this.#items = {
            "1001": item1,
            "1002": item2,
            "1003": item3,
        };
    }
}
