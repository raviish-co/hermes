import type { Generator } from "../adapters/sequences/generator";
import { Sequence } from "../adapters/sequences/sequence";
import { InsufficientStock } from "../domain/catalog/items/insufficient_stock_error";
import type { Item } from "../domain/catalog/items/item";
import type { ItemRepository } from "../domain/catalog/items/item_repository";
import type { GoodsIssueNote } from "../domain/goods_issue/goods_issue_note";
import { GoodsIssueNoteBuilder } from "../domain/goods_issue/goods_issue_note_builder";
import { GoodsIssueNoteLine } from "../domain/goods_issue/goods_issue_note_line";
import type { GoodsIssueNoteNotFound } from "../domain/goods_issue/goods_issue_note_not_found_error";
import type { GoodsIssueNoteRepository } from "../domain/goods_issue/goods_issue_note_repository";
import { InvalidPurpose } from "../domain/goods_issue/invalid_purpose_error";
import { InvalidTotal } from "../domain/goods_issue/invalid_total_error";
import { Purpose } from "../domain/goods_issue/purpose";
import type { PurposeSpecification } from "../domain/goods_issue/purpose_specification";
import type { ItemStockRepository } from "../domain/warehouse/item_stock_repository";
import { type Either, left, right } from "../shared/either";
import type { GoodsIssueNoteError } from "../shared/errors";
import { ID } from "../shared/id";

export class GoodsIssueService {
    #itemRepository: ItemRepository;
    #itemStockRepository: ItemStockRepository;
    #noteRepository: GoodsIssueNoteRepository;
    #purposeSpecification: PurposeSpecification;
    #generator: Generator;

    constructor(
        itemRepository: ItemRepository,
        itemStockRepository: ItemStockRepository,
        noteRepository: GoodsIssueNoteRepository,
        generator: Generator,
        purposeSpecification: PurposeSpecification
    ) {
        this.#itemRepository = itemRepository;
        this.#itemStockRepository = itemStockRepository;
        this.#noteRepository = noteRepository;
        this.#purposeSpecification = purposeSpecification;
        this.#generator = generator;
    }

    async new(data: NoteDTO): Promise<Either<GoodsIssueNoteError, void>> {
        const purpose = this.#buildPurpose(data.purpose);
        if (!this.#purposeSpecification.isSatisfiedBy(purpose)) {
            return left(new InvalidPurpose(data.purpose.description));
        }

        const itemsIds = this.#buildItemsIds(data.lines);
        const itemsOrErr = await this.#itemRepository.findAll(itemsIds);
        if (itemsOrErr.isLeft()) return left(itemsOrErr.value);

        const voidOrErr = await this.#reduceStockAndCalculateTotalCostOfDepartures(
            itemsOrErr.value,
            data
        );
        if (voidOrErr.isLeft()) return left(voidOrErr.value);

        const lines = this.#buildNoteLines(itemsOrErr.value, data.lines);
        const noteId = await this.#buildNoteId();
        const noteOrErr = new GoodsIssueNoteBuilder()
            .withNoteId(noteId)
            .withPurpose(purpose)
            .withReturnDate(data.returnDate)
            .withUser(data.userId)
            .withLines(lines)
            .build();

        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        if (!noteOrErr.value.isSameTotal(data.total)) {
            return left(new InvalidTotal());
        }

        await this.#noteRepository.save(noteOrErr.value);

        return right(undefined);
    }

    async list(): Promise<GoodsIssueNote[]> {
        return await this.#noteRepository.getAll();
    }

    async get(noteId: string): Promise<Either<GoodsIssueNoteNotFound, GoodsIssueNote>> {
        const noteOrErr = await this.#noteRepository.getById(ID.fromString(noteId));
        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        return right(noteOrErr.value);
    }

    async search(query: string): Promise<GoodsIssueNote[]> {
        return await this.#noteRepository.search(query);
    }

    async #buildNoteId() {
        return await this.#generator.generate(Sequence.GoodIssueNote);
    }

    #buildPurpose(data: PurposeDTO) {
        return new Purpose(data.description, data.notes, data.details);
    }

    #buildItemsIds(lines: NoteLineDTO[]): ID[] {
        return lines.map((line) => ID.fromString(line.itemId));
    }

    #buildNoteLines(items: Item[], lines: NoteLineDTO[]): GoodsIssueNoteLine[] {
        const result: GoodsIssueNoteLine[] = [];
        for (const idx in items) {
            const noteLine = this.#buildLine(items[idx], lines[idx]);
            result.push(noteLine);
        }

        return result;
    }

    #buildLine(item: Item, line: NoteLineDTO) {
        return new GoodsIssueNoteLine(
            item.itemId,
            item.name,
            item.price,
            line.goodQuantities,
            line.badQuantities,
            item.variations,
            line.comment
        );
    }

    async #reduceStockAndCalculateTotalCostOfDepartures(
        items: Item[],
        data: NoteDTO
    ): Promise<Either<InsufficientStock, void>> {
        const itemsIds = this.#buildItemsIds(data.lines);

        const itemsStock = await this.#itemStockRepository.findAll(itemsIds);

        for (const idx in itemsStock) {
            const item = items[idx];
            const line = data.lines[idx];

            const stock = itemsStock.find((stock) => stock.itemId.equals(item.itemId))!;

            if (!stock.canReduce(line.goodQuantities, line.badQuantities)) {
                return left(new InsufficientStock(item.itemId.toString()));
            }

            stock.reduce(line.goodQuantities, line.badQuantities);

            stock.calculateTotalCostOfDepartures(item.price);
        }

        await this.#itemStockRepository.saveAll(itemsStock);

        return right(undefined);
    }
}

type NoteDTO = {
    purpose: PurposeDTO;
    lines: NoteLineDTO[];
    userId: string;
    total: number;
    returnDate: string;
};

type NoteLineDTO = {
    itemId: string;
    goodQuantities: number;
    badQuantities?: number;
    comment?: string;
};

type PurposeDTO = {
    description: string;
    details?: string;
    notes: string;
};
