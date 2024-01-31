import { ProductNotFound } from "../../domain/catalog/product_not_found_error";
import { ItemRepository } from "../../domain/catalog/item_repository";
import { Product, ProductStatus } from "../../domain/catalog/product";
import { Either, left, right } from "../../shared/either";
import { Pagination } from "../../shared/pagination";
import { ProductQuery } from "../../shared/types";
import { Item } from "../../domain/catalog/item";
import { ID } from "../../shared/id";

export class ItemRepositoryStub implements ItemRepository {
    #data: Record<string, Product> = {};
    #items: Record<string, Item> = {};

    constructor() {
        this.#populate();
    }

    getById(articleId: ID): Promise<Product> {
        return Promise.resolve(this.#data[articleId.toString()]);
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
                a.name.toLowerCase().includes(query.toLowerCase()) ||
                a.productId.toString().includes(query)
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

    #populate() {
        this.#data = {
            "1001": Product.create({
                productId: "1001",
                name: "Teste",
                price: "10,00",
                condition: { status: ProductStatus.Good },
            }),
            "1002": Product.create({
                productId: "1002",
                name: "Teste 2",
                price: "15,95",
                condition: { status: ProductStatus.Good },
            }),
        };

        this.#items = {
            "1001": {
                product: Product.create({
                    productId: "1001",
                    name: "Teste 1",
                    price: "15,95",
                    condition: { status: ProductStatus.Good },
                }),
                variations: [ID.New("1001")],
            },
            "1002": {
                product: Product.create({
                    productId: "1002",
                    name: "Teste 2",
                    price: "150,95",
                    condition: { status: ProductStatus.Good },
                }),
                variations: [ID.New("1002")],
            },
            "1003": {
                product: Product.create({
                    productId: "1003",
                    name: "Teste 2",
                    price: "315,95",
                    condition: { status: ProductStatus.Good },
                }),
                variations: [ID.New("1003")],
            },
        };
    }
}
