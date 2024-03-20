import type { GoodsIssueNoteNotFound } from "../domain/goods_issue/goods_issue_note_not_found_error";
import type { GoodsIssueNoteRepository } from "../domain/goods_issue/goods_issue_note_repository";
import type { PurposeSpecification } from "../domain/goods_issue/purpose_specification";
import { GoodsIssueNoteBuilder } from "../domain/goods_issue/goods_issue_builder";
import { InsufficientStock } from "../domain/catalog/insufficient_stock_error";
import { InvalidPurpose } from "../domain/goods_issue/invalid_purpose_error";
import type { GoodsIssueNote } from "../domain/goods_issue/goods_issue_note";
import { InvalidTotal } from "../domain/goods_issue/invalid_total_error";
import { GoodsIssueNoteLine } from "../domain/goods_issue/goods_issue_note_line";
import type { ItemRepository } from "../domain/catalog/item_repository";
import type { Generator } from "../domain/sequences/generator";
import { type Either, left, right } from "../shared/either";
import type { GoodsIssueNoteError } from "../shared/errors";
import { Sequence } from "../domain/sequences/sequence";
import { Purpose } from "../domain/goods_issue/purpose";
import { Item } from "../domain/catalog/item";
import { ID } from "../shared/id";

export class GoodsIssueService {
    #goodsIssueNoteRepository: GoodsIssueNoteRepository;
    #purposeSpecification: PurposeSpecification;
    #itemRepository: ItemRepository;
    #generator: Generator;

    constructor(
        itemRepository: ItemRepository,
        goodsIssueNoteRepository: GoodsIssueNoteRepository,
        generator: Generator,
        purposeSpecification: PurposeSpecification
    ) {
        this.#goodsIssueNoteRepository = goodsIssueNoteRepository;
        this.#purposeSpecification = purposeSpecification;
        this.#itemRepository = itemRepository;
        this.#generator = generator;
    }

    async new(data: GoodsIssueNoteDTO): Promise<Either<GoodsIssueNoteError, void>> {
        const purpose = this.#buildPurpose(data.purpose);
        if (!this.#purposeSpecification.isSatisfiedBy(purpose)) {
            return left(new InvalidPurpose(data.purpose.description));
        }

        const itemsIds = this.#buildItemsIds(data.lines);
        const itemsOrErr = await this.#itemRepository.findAll(itemsIds);
        if (itemsOrErr.isLeft()) return left(itemsOrErr.value);

        const items = itemsOrErr.value;
        const linesOrErr = this.#buildGoodsIssueLines(items, data.lines);
        if (linesOrErr.isLeft()) return left(linesOrErr.value);

        const lines = linesOrErr.value;
        const noteId = this.#buildNoteId();
        const noteOrErr = new GoodsIssueNoteBuilder()
            .withGoodsIssueNoteId(noteId)
            .withPurpose(purpose)
            .withReturnDate(data.returnDate)
            .withUser(data.userId)
            .withLines(lines)
            .build();

        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        if (!noteOrErr.value.isSameTotal(data.total)) return left(new InvalidTotal());

        await this.#goodsIssueNoteRepository.save(noteOrErr.value);

        await this.#itemRepository.updateAll(items);

        return right(undefined);
    }

    async list(): Promise<GoodsIssueNote[]> {
        return await this.#goodsIssueNoteRepository.getAll();
    }

    async get(noteId: string): Promise<Either<GoodsIssueNoteNotFound, GoodsIssueNote>> {
        const noteOrErr = await this.#goodsIssueNoteRepository.getById(ID.fromString(noteId));
        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        return right(noteOrErr.value);
    }

    #buildNoteId() {
        return this.#generator.generate(Sequence.GoodIssueNote);
    }

    #buildPurpose(data: PurposeDTO) {
        return new Purpose(data.description, data.details, data.notes);
    }

    #buildItemsIds(lines: GoodIssueLineDTO[]): ID[] {
        return lines.map((line) => ID.fromString(line.itemId));
    }

    #buildGoodsIssueLines(
        items: Item[],
        lines: GoodIssueLineDTO[]
    ): Either<InsufficientStock, GoodsIssueNoteLine[]> {
        const goodsIssueLines: GoodsIssueNoteLine[] = [];

        for (const idx in items) {
            const { quantity, condition } = lines[idx];
            const item = items[idx];

            if (!item.canBeReducedStock(quantity)) {
                return left(new InsufficientStock(item.itemId.toString()));
            }

            if (condition) {
                item.updateCondition(condition.status, condition.comment);
            }

            item.reduceStock(quantity);

            const goodsIssueLine = new GoodsIssueNoteLine(
                item.itemId,
                item.name,
                item.price,
                item.variations,
                item.fulltext,
                quantity
            );

            goodsIssueLines.push(goodsIssueLine);
        }

        return right(goodsIssueLines);
    }
}

type GoodsIssueNoteDTO = {
    purpose: PurposeDTO;
    lines: GoodIssueLineDTO[];
    userId: string;
    total: number;
    returnDate: string;
};

type GoodIssueLineDTO = {
    itemId: string;
    quantity: number;
    condition?: Condition;
};

type PurposeDTO = {
    description: string;
    details?: string;
    notes: string;
};

type Condition = {
    status: string;
    comment?: string;
};
