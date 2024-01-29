import { Product, ArticleStatus } from "../../domain/products/product";
import { Either, left, right } from "../../shared/either";
import { ID } from "../../shared/id";
import { ProductNotFound } from "../../domain/products/product_not_found_error";
import { ProductQuery, ItemRepository } from "../../domain/products/item_repository";
import { Pagination } from "../../shared/pagination";
import { Item } from "../../domain/products/item";

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
                (item) => item.product.articleId.toString() === query.productId.toString()
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

    #populate() {
        this.#data = {
            "1001": Product.create({
                articleId: "1001",
                title: "Teste",
                price: "10,00",
                condition: { status: ArticleStatus.Good },
                securityDeposit: "100",
            }),
            "1002": Product.create({
                articleId: "1002",
                title: "Teste 2",
                price: "15,95",
                condition: { status: ArticleStatus.Good },
                securityDeposit: "150",
            }),
        };

        this.#items = {
            "1001": {
                product: Product.create({
                    articleId: "1001",
                    title: "Teste 1",
                    price: "15,95",
                    condition: { status: ArticleStatus.Good },
                    securityDeposit: "150",
                }),
                variations: [ID.New("1001")],
            },
            "1002": {
                product: Product.create({
                    articleId: "1002",
                    title: "Teste 2",
                    price: "150,95",
                    condition: { status: ArticleStatus.Good },
                    securityDeposit: "150",
                }),
                variations: [ID.New("1002")],
            },
            "1003": {
                product: Product.create({
                    articleId: "1003",
                    title: "Teste 2",
                    price: "315,95",
                    condition: { status: ArticleStatus.Good },
                    securityDeposit: "150",
                }),
                variations: [ID.New("1003")],
            },
        };
    }
}
