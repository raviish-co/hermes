import { InsufficientStockItem } from "@backend/domain/sequences/insufficient_item_stock_error";
import type { ItemCategoryRepository } from "@backend/domain/catalog/item_category_repository";
import type { GoodsIssueRepository } from "@backend/domain/requests/goods_issue_repository";
import type { PurposeSpecification } from "@backend/domain/requests/purpose_specification";
import type { GoodsIssueDTO, GoodIssueLineDTO, ItemQuery } from "@backend/shared/types";
import { PurposeNotFound } from "@backend/domain/requests/purpose_not_found_error";
import { GoodsIssueBuilder } from "@backend/domain/requests/goods_issue_builder";
import type { ItemCategory } from "~/lib/backend/domain/catalog/item_category";
import { GoodsIssueLine } from "@backend/domain/requests/goods_issue_line";
import type { Generator } from "@backend/domain/sequences/generator";
import { type Either, left, right } from "@backend/shared/either";
import { Sequence } from "@backend/domain/sequences/sequence";
import type { RequestError } from "@backend/shared/errors";
import { User } from "@backend/domain/user";
import { ID } from "@backend/shared/id";

export class GoodsIssueService {
    #itemCategoryRepository: ItemCategoryRepository;
    #goodsIssueRepository: GoodsIssueRepository;
    #sequenceGenerator: Generator;
    #purposeSpecification: PurposeSpecification;

    constructor(
        itemCategoryRepository: ItemCategoryRepository,
        goodsIssueRepository: GoodsIssueRepository,
        sequenceGenerator: Generator,
        purposeSpecification: PurposeSpecification
    ) {
        this.#itemCategoryRepository = itemCategoryRepository;
        this.#goodsIssueRepository = goodsIssueRepository;
        this.#sequenceGenerator = sequenceGenerator;
        this.#purposeSpecification = purposeSpecification;
    }

    async requestItems(data: GoodsIssueDTO): Promise<Either<RequestError, void>> {
        const { purpose, goodIssueLines: lines, total, returnDate, securityDeposit } = data;

        if (!this.#purposeSpecification.isSatisfiedBy(purpose))
            return left(new PurposeNotFound(purpose.description));

        const itemsQueries = this.#buildQueries(lines);
        const itemsCategoriesOrError = await this.#itemCategoryRepository.getAll(itemsQueries);
        if (itemsCategoriesOrError.isLeft()) return left(itemsCategoriesOrError.value);

        const itemsCategories = itemsCategoriesOrError.value;
        const goodsIssueLinesOrError = this.#buildGoodsIssueLines(itemsCategories, lines);
        if (goodsIssueLinesOrError.isLeft()) return left(goodsIssueLinesOrError.value);

        const goodsIssueId = this.#sequenceGenerator.generate(Sequence.Request);
        const goodsIssueLines = goodsIssueLinesOrError.value;
        const user = User.create("Teste");
        const goodsIssueOrError = new GoodsIssueBuilder()
            .withUser(user)
            .withTotal(total)
            .withPurpose(purpose)
            .withReturnDate(returnDate)
            .withGoodsIssueId(goodsIssueId)
            .withGoodsIssueLines(goodsIssueLines)
            .withSecurityDeposit(securityDeposit)
            .build();

        if (goodsIssueOrError.isLeft()) return left(goodsIssueOrError.value);

        await this.#goodsIssueRepository.save(goodsIssueOrError.value);

        await this.#itemCategoryRepository.updateAll(itemsCategories);

        return right(undefined);
    }

    #buildQueries(lines: GoodIssueLineDTO[]): ItemQuery[] {
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
        lines: GoodIssueLineDTO[]
    ): Either<InsufficientStockItem, GoodsIssueLine[]> {
        const goodsIssueLines: GoodsIssueLine[] = [];

        for (const idx in items) {
            const { quantity, condition } = lines[idx];

            const item = items[idx];

            if (!item.canBeReducedStock(quantity))
                return left(new InsufficientStockItem(item.itemId.toString()));

            item.reduceStock(quantity);

            if (condition) item.updateCondition(condition);

            const goodsIssueLine = GoodsIssueLine.create({ item, quantity });

            goodsIssueLines.push(goodsIssueLine);
        }

        return right(goodsIssueLines);
    }
}
