import type { ItemCategory } from "../domain/catalog/item";
import type { ItemRepository } from "../domain/catalog/item_repository";
import { PurposeNotFound } from "../domain/requests/purpose_not_found_error";
import type { PurposeSpecification } from "../domain/requests/purpose_specification";
import { GoodsIssueBuilder } from "../domain/requests/request_builder";
import { RequestItem } from "../domain/requests/request_item";
import type { GoodsIssueRepository } from "../domain/requests/request_repository";
import { InsufficientStockItem } from "../domain/sequences/insufficient_item_stock_error";
import { Sequence } from "../domain/sequences/sequence";
import { User } from "../domain/user";
import { type Either, left, right } from "../shared/either";
import type { RequestError } from "../shared/errors";
import { ID } from "../shared/id";
import type { GoodsIssueDTO, GoodIssueLine, ItemQuery } from "../shared/types";
import type { Generator } from "../domain/sequences/generator";

export class GoodsIssueService {
    #itemRepository: ItemRepository;
    #requestRepository: GoodsIssueRepository;
    #sequenceGenerator: Generator;
    #purposeSpecification: PurposeSpecification;

    constructor(
        itemRepository: ItemRepository,
        requestRepository: GoodsIssueRepository,
        sequenceGenerator: Generator,
        PurposeSpecification: PurposeSpecification
    ) {
        this.#itemRepository = itemRepository;
        this.#requestRepository = requestRepository;
        this.#sequenceGenerator = sequenceGenerator;
        this.#purposeSpecification = PurposeSpecification;
    }

    async requestItems(data: GoodsIssueDTO): Promise<Either<RequestError, void>> {
        const { purpose, goodIssueLines: lines, total, returnDate, securityDeposit } = data;

        if (!this.#purposeSpecification.isSatisfiedBy(purpose))
            return left(new PurposeNotFound(purpose.description));

        const itemsQueries = this.#buildQueries(lines);
        const itemsOrError = await this.#itemRepository.getAll(itemsQueries);
        if (itemsOrError.isLeft()) return left(itemsOrError.value);

        const items = itemsOrError.value;
        const requestItemsOrError = this.#buildGoodsIssueLines(items, lines);
        if (requestItemsOrError.isLeft()) return left(requestItemsOrError.value);

        const requestId = this.#sequenceGenerator.generate(Sequence.Request);
        const requestItems = requestItemsOrError.value;
        const user = User.create("Teste");
        const requestOrError = new GoodsIssueBuilder()
            .withGoodsIssueId(requestId)
            .withPurpose(purpose)
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

    #buildQueries(lines: GoodIssueLine[]): ItemQuery[] {
        const queries: ItemQuery[] = [];
        for (const line of lines) {
            const query = {
                itemId: ID.New(line.itemId),
                variations: line.variations ? line.variations.map((v) => ID.New(v)) : [],
            };
            queries.push(query);
        }
        return queries;
    }

    #buildGoodsIssueLines(
        items: ItemCategory[],
        lines: GoodIssueLine[]
    ): Either<InsufficientStockItem, RequestItem[]> {
        const requestItems: RequestItem[] = [];

        for (const idx in items) {
            const { quantity, condition } = lines[idx];

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
