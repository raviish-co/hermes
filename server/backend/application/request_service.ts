import { Purpose } from "../domain/purposes/purpose";
import { PurposeData } from "../domain/purposes/purpose_data";
import { PurposeSource } from "../domain/purposes/purpose_source";
import { PurposeNotFound } from "../domain/purposes/purpose_not_found_error";
import { RequestedItems as RequestedItems } from "../domain/requests/requested_items";
import { RequestItem } from "../domain/requests/request_item";
import { User } from "../domain/user";
import { Either, left, right } from "../shared/either";
import { InvalidTotal } from "../domain/requests/invalid_total_error";
import { ItemRepository } from "../domain/catalog/item_repository";
import { ID } from "../shared/id";
import { InsufficientStock } from "../domain/insufficient_stock_error";
import { RequestRepository } from "../domain/requests/request_repository";
import { ProductData, ProductQuery, RequestProductsData, StockQuery } from "../shared/types";
import { NewRequestProductsError } from "../shared/errors";
import { Item } from "../domain/catalog/item";
import { StockRepository } from "../domain/stock_repository";

export class RequestService {
    readonly purposeSource: PurposeSource;
    readonly itemRepository: ItemRepository;
    readonly requestArticlesRepository: RequestRepository;
    readonly stockRepository: StockRepository;

    constructor(
        purposeSource: PurposeSource,
        itemRepository: ItemRepository,
        requestArticlesRepository: RequestRepository,
        stockRepository: StockRepository
    ) {
        this.purposeSource = purposeSource;
        this.itemRepository = itemRepository;
        this.requestArticlesRepository = requestArticlesRepository;
        this.stockRepository = stockRepository;
    }

    async listPurposes(): Promise<PurposeData[]> {
        const purposes = await this.purposeSource.list();
        return Promise.resolve(purposes);
    }

    async requestArticles(
        data: RequestProductsData
    ): Promise<Either<NewRequestProductsError, void>> {
        const { purposeData, productsData, requestTotal, returnDate } = data;

        const purposeExists = await this.purposeSource.exists(purposeData.name);
        if (!purposeExists) return left(new PurposeNotFound(purposeData.name));

        const itemsQueries = this.#buildQueries(productsData);
        const itemsOrError = await this.itemRepository.getAll(itemsQueries);
        if (itemsOrError.isLeft()) return left(itemsOrError.value);

        const stockQueries = this.#buildStockQueries(productsData);
        const voidOrError = await this.stockRepository.verifyStock(stockQueries);
        if (voidOrError.isLeft()) return left(voidOrError.value);

        const purpose = Purpose.fromOptions(purposeData);
        const items = itemsOrError.value;
        const user = User.create("Teste");
        const requestedItems = RequestedItems.create({
            purpose,
            user,
            returnDate,
        });

        const requestedItemsOrError = this.#buildRequestedItems(items, productsData);
        if (requestedItemsOrError.isLeft()) return left(requestedItemsOrError.value);

        requestedItems.addItems(requestedItemsOrError.value);
        if (!requestedItems.isSameTotal(requestTotal)) return left(new InvalidTotal());

        await this.requestArticlesRepository.save(requestedItems);

        // await this.articleRepository.updateStock(articles);

        return right(undefined);
    }

    #buildQueries(products: ProductData[]): ProductQuery[] {
        const queries: ProductQuery[] = [];
        for (const product of products) {
            const query = {
                productId: ID.New(product.productId),
                variations: product.variations ? product.variations.map((v) => ID.New(v)) : [],
            };
            queries.push(query);
        }
        return queries;
    }

    #buildRequestedItems(
        articles: Item[],
        articlesData: ProductData[]
    ): Either<InsufficientStock, RequestItem[]> {
        const requestedItems: RequestItem[] = [];

        for (const i in articles) {
            const { quantity } = articlesData[i];
            const article = articles[i];
            const requestedItem = RequestItem.create({ item: article, quantity });
            requestedItems.push(requestedItem);
        }
        return right(requestedItems);
    }

    #buildStockQueries(products: ProductData[]): StockQuery[] {
        const queries: StockQuery[] = [];
        for (const product of products) {
            const query = {
                itemId: ID.New(product.productId),
                quantity: product.quantity,
            };
            queries.push(query);
        }
        return queries;
    }
}
