import { InsufficientStockItem } from "../domain/sequences/insufficient_item_stock_error";
import { PurposeNotFound } from "../domain/purposes/purpose_not_found_error";
import { RequestRepository } from "../domain/requests/request_repository";
import { ItemData, ItemQuery, RequestData } from "../shared/types";
import { Sequence } from "../domain/sequences/sequence";
import { RequestBuilder } from "../domain/requests/request_builder";
import { ItemRepository } from "../domain/catalog/item_repository";
import { PurposeSource } from "../domain/purposes/purpose_source";
import { RequestItem } from "../domain/requests/request_item";
import { PurposeData } from "../domain/purposes/purpose_data";
import { Generator } from "../domain/sequences/generator";
import { Either, left, right } from "../shared/either";
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

        const items = itemsOrError.value;
        const requestItemsOrError = this.#buildRequestItems(items, productsData);
        if (requestItemsOrError.isLeft()) return left(requestItemsOrError.value);

        const requestId = this.#sequenceGenerator.generate(Sequence.Request);
        const requestItems = requestItemsOrError.value;
        const user = User.create("Teste");
        const requestOrError = new RequestBuilder()
            .withRequestId(requestId)
            .withPurpose(purposeData)
            .withRequestItems(requestItems)
            .withUser(user)
            .withReturnDate(returnDate)
            .withTotal(total)
            .withSecurityDeposit(securityDeposit)
            .build();

        if (requestOrError.isLeft()) return left(requestOrError.value);
        await this.#requestRepository.save(requestOrError.value);

        await this.#itemRepository.updateAll(items);

        return right(undefined);
    }

    #buildQueries(items: ItemData[]): ItemQuery[] {
        const queries: ItemQuery[] = [];
        for (const item of items) {
            const query = {
                itemId: ID.New(item.itemId),
                variations: item.variations ? item.variations.map((v) => ID.New(v)) : [],
            };
            queries.push(query);
        }
        return queries;
    }

    #buildRequestItems(
        items: Item[],
        itemData: ItemData[]
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
}
