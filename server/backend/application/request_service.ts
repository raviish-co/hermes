import { ProductData, ProductQuery, RequestData, StockQuery } from "../shared/types";
import { PurposeNotFound } from "../domain/purposes/purpose_not_found_error";
import { RequestRepository } from "../domain/requests/request_repository";
import { InsufficientStock } from "../domain/insufficient_stock_error";
import { InvalidTotal } from "../domain/requests/invalid_total_error";
import { Request } from "../domain/requests/request";
import { ItemRepository } from "../domain/catalog/item_repository";
import { PurposeSource } from "../domain/purposes/purpose_source";
import { RequestItem } from "../domain/requests/request_item";
import { PurposeData } from "../domain/purposes/purpose_data";
import { StockRepository } from "../domain/stock_repository";
import { Either, left, right } from "../shared/either";
import { Purpose } from "../domain/purposes/purpose";
import { RequestError } from "../shared/errors";
import { Item } from "../domain/catalog/item";
import { User } from "../domain/user";
import { ID } from "../shared/id";

export class RequestService {
    readonly purposeSource: PurposeSource;
    readonly itemRepository: ItemRepository;
    readonly requestRepository: RequestRepository;
    readonly stockRepository: StockRepository;

    constructor(
        purposeSource: PurposeSource,
        itemRepository: ItemRepository,
        requestRepository: RequestRepository,
        stockRepository: StockRepository
    ) {
        this.purposeSource = purposeSource;
        this.itemRepository = itemRepository;
        this.requestRepository = requestRepository;
        this.stockRepository = stockRepository;
    }

    async listPurposes(): Promise<PurposeData[]> {
        const purposes = await this.purposeSource.list();
        return Promise.resolve(purposes);
    }

    async requestItems(data: RequestData): Promise<Either<RequestError, void>> {
        const { purposeData, productsData, total, returnDate, securityDeposit } = data;

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
        const request = Request.create({
            purpose,
            user,
            returnDate,
        });

        const requestItemsOrError = this.#buildRequestItems(items, productsData);
        if (requestItemsOrError.isLeft()) return left(requestItemsOrError.value);

        request.addItems(requestItemsOrError.value);

        if (!request.isSameTotal(total)) return left(new InvalidTotal());

        if (!request.isSameSecurityDeposit(securityDeposit)) return left(new InvalidTotal());

        await this.requestRepository.save(request);

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

    #buildRequestItems(
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
