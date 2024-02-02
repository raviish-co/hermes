import { PurposeNotFound } from "../domain/purposes/purpose_not_found_error";
import { RequestRepository } from "../domain/requests/request_repository";
import { ProductData, ProductQuery, RequestData } from "../shared/types";
import { InsufficientStockItem } from "../domain/sequences/insufficient_item_stock_error";
import { InvalidTotal } from "../domain/requests/invalid_total_error";
import { ItemRepository } from "../domain/catalog/item_repository";
import { PurposeSource } from "../domain/purposes/purpose_source";
import { RequestItem } from "../domain/requests/request_item";
import { SequencePrefix } from "../domain/sequences/sequence_prefix";
import { PurposeData } from "../domain/purposes/purpose_data";
import { Generator } from "../domain/sequences/generator";
import { Either, left, right } from "../shared/either";
import { Purpose } from "../domain/purposes/purpose";
import { Request } from "../domain/requests/request";
import { RequestError } from "../shared/errors";
import { Item } from "../domain/catalog/item";
import { User } from "../domain/user";
import { ID } from "../shared/id";

export class RequestService {
    #purposeSource: PurposeSource;
    #itemRepository: ItemRepository;
    #requestRepository: RequestRepository;
    #sequenceGenerator: Generator;

    constructor(
        purposeSource: PurposeSource,
        itemRepository: ItemRepository,
        requestRepository: RequestRepository,
        sequenceGenerator: Generator
    ) {
        this.#purposeSource = purposeSource;
        this.#itemRepository = itemRepository;
        this.#requestRepository = requestRepository;
        this.#sequenceGenerator = sequenceGenerator;
    }

    async listPurposes(): Promise<PurposeData[]> {
        const purposes = await this.#purposeSource.list();
        return Promise.resolve(purposes);
    }

    async requestItems(data: RequestData): Promise<Either<RequestError, void>> {
        const { purposeData, productsData, total, returnDate, securityDeposit } = data;

        const purposeExists = await this.#purposeSource.exists(purposeData.name);
        if (!purposeExists) return left(new PurposeNotFound(purposeData.name));

        const itemsQueries = this.#buildQueries(productsData);
        const itemsOrError = await this.#itemRepository.getAll(itemsQueries);
        if (itemsOrError.isLeft()) return left(itemsOrError.value);

        const requestId = this.#sequenceGenerator.generate(SequencePrefix.Request);

        const purpose = Purpose.fromOptions(purposeData);
        const items = itemsOrError.value;
        const user = User.create("Teste");
        const request = Request.create({
            requestId,
            purpose,
            user,
            returnDate,
        });

        const requestItemsOrError = this.#buildRequestItems(items, productsData);
        if (requestItemsOrError.isLeft()) return left(requestItemsOrError.value);

        request.addItems(requestItemsOrError.value);

        if (this.#verifyTotal(request, total, securityDeposit)) return left(new InvalidTotal());

        await this.#requestRepository.save(request);

        await this.#itemRepository.updateAll(items);

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
        items: Item[],
        itemData: ProductData[]
    ): Either<InsufficientStockItem, RequestItem[]> {
        const requestItems: RequestItem[] = [];

        for (const idx in items) {
            const { quantity, condition } = itemData[idx];

            const item = items[idx];

            if (!item.canBeReducedStock(quantity))
                return left(new InsufficientStockItem(item.itemId.toString()));

            item.reduceStock(quantity);

            if (condition) item.updateCondition(condition);

            const requestItem = RequestItem.create({ item, quantity });

            requestItems.push(requestItem);
        }

        return right(requestItems);
    }

    #verifyTotal(request: Request, total: string, securityDeposit: string): boolean {
        return !request.isSameTotal(total) || !request.isSameSecurityDeposit(securityDeposit);
    }
}
