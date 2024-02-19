import { InsufficientStockItem } from "../domain/catalog/insufficient_item_stock_error";
import type { ItemCategoryRepository } from "../domain/catalog/item_category_repository";
import type { GoodsIssueRepository } from "../domain/goods_issue/goods_issue_repository";
import type { PurposeSpecification } from "../domain/goods_issue/purpose_specification";
import type { GoodsIssueDTO, GoodIssueLineDTO, ItemQuery } from "../shared/types";
import { PurposeNotFound } from "../domain/goods_issue/purpose_not_found_error";
import type { SequenceGenerator } from "../domain/sequences/sequence_generator";
import type { ItemCategory } from "~/lib/backend/domain/catalog/item_category";
import { GoodsIssueBuilder } from "../domain/goods_issue/goods_issue_builder";
import { GoodsIssueLine } from "../domain/goods_issue/goods_issue_line";
import { type Either, left, right } from "../shared/either";
import { Sequence } from "../domain/sequences/sequence";
import { Purpose } from "../domain/goods_issue/purpose";
import type { GoodsIssueError } from "../shared/errors";
import { User } from "../domain/user";
import { ID } from "../shared/id";

export class GoodsIssueService {
    #itemCategoryRepository: ItemCategoryRepository;
    #goodsIssueRepository: GoodsIssueRepository;
    #sequenceGenerator: SequenceGenerator;
    #purposeSpecification: PurposeSpecification;

    constructor(
        itemCategoryRepository: ItemCategoryRepository,
        goodsIssueRepository: GoodsIssueRepository,
        sequenceGenerator: SequenceGenerator,
        purposeSpecification: PurposeSpecification
    ) {
        this.#itemCategoryRepository = itemCategoryRepository;
        this.#goodsIssueRepository = goodsIssueRepository;
        this.#sequenceGenerator = sequenceGenerator;
        this.#purposeSpecification = purposeSpecification;
    }

    async new(data: GoodsIssueDTO): Promise<Either<GoodsIssueError, void>> {
        const { purpose: purposeData, lines, total, returnDate, securityDeposit } = data;

        const purpose = Purpose.fromOptions(purposeData);
        if (!this.#purposeSpecification.isSatisfiedBy(purpose))
            return left(new PurposeNotFound(purposeData.description));

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
            const query = { itemId: ID.New(line.itemId) };
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
