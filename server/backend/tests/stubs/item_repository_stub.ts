import { ProductNotFound } from "../../domain/catalog/product_not_found_error";
import { ItemRepository } from "../../domain/catalog/item_repository";
import { Item, ItemStatus } from "../../domain/catalog/item";
import { Variation } from "../../domain/catalog/variation";
import { Either, left, right } from "../../shared/either";
import { Product } from "../../domain/catalog/product";
import { Pagination } from "../../shared/pagination";
import { ItemStock } from "../../domain/catalog/item_stock";
import { ItemQuery } from "../../shared/types";
import { ID } from "../../shared/id";

export class ItemRepositoryStub implements ItemRepository {
    #items: Record<string, Item> = {};

    constructor() {
        this.#populate();
    }

    getById(itemId: ID): Promise<Item> {
        return Promise.resolve(this.#items[itemId.toString()]);
    }

    getAll(queries: ItemQuery[]): Promise<Either<ProductNotFound, Item[]>> {
        const items = Object.values(this.#items);
        const articles: Item[] = [];

        for (const query of queries) {
            const filtered = items.find(
                (item) => item.itemId.toString() === query.itemId.toString()
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
        const items = this.records.filter((i) => {
            return (
                i.product.name.toLowerCase().includes(query.toLowerCase()) ||
                i.itemId.toString().includes(query)
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

    get records(): Item[] {
        return Object.values(this.#items);
    }

    last(): Promise<Item> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    #populate() {
        const product = Product.create({
            name: "Teste 1",
            price: "15,95",
            subcategory: "some-subcategory",
        });

        const product2 = Product.create({
            name: "Teste 2",
            price: "150,95",
            subcategory: "some-subcategory",
        });

        const product3 = Product.create({
            name: "Teste 2",
            price: "315,95",
            subcategory: "some-subcategory",
        });

        const variation = Variation.create({
            variationId: "9999",
            attribute: { name: "Cor" },
            value: { value: "Azul" },
        });

        const variation1 = Variation.create({
            variationId: "9991",
            attribute: { name: "Marca" },
            value: { value: "Nike" },
        });

        const stock1 = new ItemStock(10);
        const stock2 = new ItemStock(10);
        const stock3 = new ItemStock(10);

        const item1 = Item.create({
            itemId: "1001",
            product,
            condition: { status: ItemStatus.Good },
            stock: stock1,
            variations: [variation, variation1],
        });

        const item2 = Item.create({
            itemId: "1002",
            product: product2,
            condition: { status: ItemStatus.Good },
            stock: stock2,
            variations: [variation],
        });

        const item3 = Item.create({
            itemId: "1003",
            product: product3,
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
