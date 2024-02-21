import type { GoodsIssueRepository } from "../domain/goods_issue/goods_issue_note_repository";
import type { PurposeSpecification } from "../domain/goods_issue/purpose_specification";
import { GoodsIssueNoteBuilder } from "../domain/goods_issue/goods_issue_builder";
import { PurposeNotFound } from "../domain/goods_issue/purpose_not_found_error";
import type { SequenceGenerator } from "../domain/sequences/sequence_generator";
import { InsufficientStock } from "../domain/catalog/insufficient_stock_error";
import { InvalidTotal } from "../domain/goods_issue/invalid_total_error";
import { GoodsIssueLine } from "../domain/goods_issue/goods_issue_line";
import type { ItemRepository } from "../domain/catalog/item_repository";
import { type Either, left, right } from "../shared/either";
import { Sequence } from "../domain/sequences/sequence";
import { Purpose } from "../domain/goods_issue/purpose";
import type { GoodsIssueNoteError } from "../shared/errors";
import { Item } from "../domain/catalog/item";
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

    async new(data: GoodsIssueDTO): Promise<Either<GoodsIssueNoteError, void>> {
        const purpose = new Purpose(
            data.purpose.description,
            data.purpose.detailConstraint,
            data.purpose.notes
        );
        if (!this.#purposeSpecification.isSatisfiedBy(purpose))
            return left(new PurposeNotFound(data.purpose.description));

        const itemsIds = this.#buildItemsIds(data.lines);
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
            .withGoodsIssueNoteId(issueId)
            .withUser(data.userId)
            .withLines(lines)
            .build();

        if (noteOrError.isLeft()) return left(noteOrError.value);

        if (!noteOrError.value.isSameTotal(data.total)) return left(new InvalidTotal());

        await this.#goodsIssueRepository.save(noteOrError.value);

        await this.#itemRepository.updateAll(items);

        return right(undefined);
    }

    #buildItemsIds(lines: GoodIssueLineDTO[]): ID[] {
        const itemsIds: ID[] = [];
        for (const line of lines) {
            const itemId = ID.fromString(line.itemId);
            itemsIds.push(itemId);
        }
        return itemsIds;
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

            if (condition) item.updateCondition(condition.status, condition.comment);

            const goodsIssueLine = new GoodsIssueLine(item.itemId, item.price, quantity);

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
    userId: string;
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
