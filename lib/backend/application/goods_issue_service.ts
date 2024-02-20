import type { GoodsIssueRepository } from "../domain/goods_issue/goods_issue_note_repository";
import type { PurposeSpecification } from "../domain/goods_issue/purpose_specification";
import { PurposeNotFound } from "../domain/goods_issue/purpose_not_found_error";
import type { SequenceGenerator } from "../domain/sequences/sequence_generator";
import { InsufficientStock } from "../domain/catalog/insufficient_stock_error";
import { GoodsIssueBuilder as GoodsIssueNoteBuilder } from "../domain/goods_issue/goods_issue_builder";
import { GoodsIssueLine } from "../domain/goods_issue/goods_issue_line";
import type { ItemRepository } from "../domain/catalog/item_repository";
import { type Either, left, right } from "../shared/either";
import { Sequence } from "../domain/sequences/sequence";
import { Purpose } from "../domain/goods_issue/purpose";
import type { GoodsIssueError } from "../shared/errors";
import { Item } from "../domain/catalog/item";
import { ID } from "../shared/id";
import { InvalidTotal } from "../domain/goods_issue/invalid_total_error";

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
        const purpose = Purpose.fromOptions(data.purpose);
        if (!this.#purposeSpecification.isSatisfiedBy(purpose))
            return left(new PurposeNotFound(data.purpose.description));

        const itemsIds = this.#buildQueries(data.lines);

        const itemsOrErr = await this.#itemRepository.findAll(itemsIds);
        if (itemsOrErr.isLeft()) return left(itemsOrErr.value);

        const items = itemsOrErr.value;
        const linesOrErr = this.#buildGoodsIssueLines(items, data.lines);
        if (linesOrErr.isLeft()) return left(linesOrErr.value);

        const issueId = this.#sequenceGenerator.generate(Sequence.GoodIssueNote);
        const lines = linesOrErr.value;
        const noteOrError = new GoodsIssueNoteBuilder()
            .withPurpose(purpose)
            .withReturnDate(data.returnDate)
            .withGoodsIssueId(issueId)
            .withUser(ID.fromString("user-id"))
            .withLines(lines)
            .build();

        if (noteOrError.isLeft()) return left(noteOrError.value);

        if (!noteOrError.value.isSameTotal(data.total)) return left(new InvalidTotal());

        await this.#goodsIssueRepository.save(noteOrError.value);

        await this.#itemRepository.updateAll(items);

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
