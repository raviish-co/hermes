import type { GoodsIssueRepository } from "../domain/goods_issue/goods_issue_repository";
import type { PurposeSpecification } from "../domain/goods_issue/purpose_specification";
import { PurposeNotFound } from "../domain/goods_issue/purpose_not_found_error";
import type { SequenceGenerator } from "../domain/sequences/sequence_generator";
import { InsufficientStock } from "../domain/catalog/insufficient_stock_error";
import { GoodsIssueBuilder } from "../domain/goods_issue/goods_issue_builder";
import { GoodsIssueLine } from "../domain/goods_issue/goods_issue_line";
import type { ItemRepository } from "../domain/catalog/item_repository";
import { type Either, left, right } from "../shared/either";
import { Sequence } from "../domain/sequences/sequence";
import { Purpose } from "../domain/goods_issue/purpose";
import type { GoodsIssueError } from "../shared/errors";
import { Item } from "../domain/catalog/item";
import { User } from "../domain/user";
import { ID } from "../shared/id";

export class GoodsIssueService {
    #itemRepository: ItemRepository;
    #goodsIssueRepository: GoodsIssueRepository;
    #sequenceGenerator: SequenceGenerator;
    #purposeSpecification: PurposeSpecification;

    constructor(
        itemRepository: ItemRepository,
        goodsIssueRepository: GoodsIssueRepository,
        sequenceGenerator: SequenceGenerator,
        purposeSpecification: PurposeSpecification
    ) {
        this.#itemRepository = itemRepository;
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

        const itemsCategoriesOrError = await this.#itemRepository.findAll(itemsQueries);
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

        await this.#itemRepository.updateAll(itemsCategories);

        return right(undefined);
    }

    #buildQueries(lines: GoodIssueLineDTO[]): ID[] {
        const queries: ID[] = [];
        for (const line of lines) {
            const query = ID.fromString(line.itemId);
            queries.push(query);
        }
        return queries;
    }

    #buildGoodsIssueLines(
        items: Item[],
        lines: GoodIssueLineDTO[]
    ): Either<InsufficientStock, GoodsIssueLine[]> {
        const goodsIssueLines: GoodsIssueLine[] = [];

        for (const idx in items) {
            const { quantity, condition } = lines[idx];

            const item = items[idx];

            if (!item.canBeReducedStock(quantity))
                return left(new InsufficientStock(item.itemId.toString()));

            item.reduceStock(quantity);

            if (condition) item.updateCondition(condition as any);

            const goodsIssueLine = GoodsIssueLine.create(item, quantity);

            goodsIssueLines.push(goodsIssueLine);
        }

        return right(goodsIssueLines);
    }
}

type GoodsIssueDTO = {
    purpose: {
        description: string;
        detailConstraint?: string;
        notes?: string;
    };
    lines: GoodIssueLineDTO[];
    total: string;
    returnDate: string;
    securityDeposit: string;
};

type GoodIssueLineDTO = {
    itemId: string;
    quantity: number;
    condition?: Condition;
};

type Condition = {
    status: string;
    comment?: string;
};
