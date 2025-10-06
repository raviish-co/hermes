import type { Generator } from "../adapters/sequences/generator";
import { Sequence } from "../adapters/sequences/sequence";
import type { ItemRepository } from "../domain/catalog/items/item_repository";
import type { GoodsReceiptNote } from "../domain/goods_receipt/goods_receipt_note";
import { GoodsReceiptNoteBuilder } from "../domain/goods_receipt/goods_receipt_note_builder";
import { GoodsReceiptNoteLine } from "../domain/goods_receipt/goods_receipt_note_line";
import type { GoodsReceiptNoteRepository } from "../domain/goods_receipt/goods_receipt_note_repository";
import { InvalidEntryDate } from "../domain/goods_receipt/invalid_entry_date_error";
import { InvalidLines } from "../domain/goods_receipt/invalid_lines_error";
import { ItemStock } from "../domain/warehouse/item_stock";
import { ItemStockType } from "../domain/warehouse/item_stock_type";
import type { ItemStockRepository } from "../domain/warehouse/item_stock_repository";
import { left, right, type Either } from "../shared/either";
import type { GoodsReceiptError } from "../shared/errors";
import { ID } from "../shared/id";
import { InvalidQuantitiesError } from "./invalid_quantities_error";
import type { Pagination } from "../shared/pagination";

export class GoodsReceiptService {
    #itemRepository: ItemRepository;
    #itemStockRepository: ItemStockRepository;
    #noteRepository: GoodsReceiptNoteRepository;
    #generator: Generator;

    constructor(
        itemRepository: ItemRepository,
        itemStockRepository: ItemStockRepository,
        noteRepository: GoodsReceiptNoteRepository,
        generator: Generator
    ) {
        this.#itemRepository = itemRepository;
        this.#itemStockRepository = itemStockRepository;
        this.#noteRepository = noteRepository;
        this.#generator = generator;
    }

    async new(data: NoteDTO): Promise<Either<GoodsReceiptError, void>> {
        if (!data.entryDate) return left(new InvalidEntryDate(data.entryDate));

        if (this.#isValidLines(data)) return left(new InvalidLines());

        if (!this.#isValidQuantities(data.lines)) {
            return left(new InvalidQuantitiesError("GoodsReceiptService"));
        }

        const itemsIds = data.lines.map(({ itemId }) => ID.fromString(itemId));

        const itemsOrErr = await this.#itemRepository.findAll(itemsIds);
        if (itemsOrErr.isLeft()) return left(itemsOrErr.value);

        const itemsStock = await this.#adjustStockLevels(itemsIds, data.lines);

        const lines = this.#buildLines(data.lines);
        const noteId = await this.#generator.generate(Sequence.GoodsReceiptNote);
        const noteOrErr = new GoodsReceiptNoteBuilder()
            .withNoteId(noteId)
            .withEntryDate(data.entryDate)
            .withUser(data.userId)
            .withLines(lines)
            .build();

        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        this.#noteRepository.save(noteOrErr.value);

        this.#itemStockRepository.saveAll(itemsStock);

        return right(undefined);
    }

    async list(pageToken = 1, perPage = 12): Promise<Pagination<GoodsReceiptNote>> {
        return this.#noteRepository.getAll({ pageToken, perPage });
    }

    async #adjustStockLevels(itemIds: ID[], lines: NoteLineDTO[]) {
        const itemsStock = await this.#itemStockRepository.findAll(itemIds);
        for (const line of lines) {
            const itemStock = itemsStock.find((is) => is.itemId.toString() === line.itemId);

            if (!itemStock) {
                const newStock = new ItemStock(
                    ID.fromString(line.itemId),
                    line.goodQuantities,
                    line.badQuantities,
                    line.isConsignment ? ItemStockType.Consignacao : undefined,
                    line.consignmentValue
                );

                itemsStock.push(newStock);

                continue;
            }

            itemStock.increase(line.goodQuantities, line.badQuantities);
        }

        return itemsStock;
    }

    #buildLines(lines: NoteLineDTO[]): GoodsReceiptNoteLine[] {
        return lines.map(this.#buildLine);
    }

    #buildLine(line: NoteLineDTO): GoodsReceiptNoteLine {
        return new GoodsReceiptNoteLine(
            ID.fromString(line.itemId),
            line.goodQuantities,
            line.badQuantities,
            line.comment,
            line.isConsignment ? ItemStockType.Consignacao : undefined,
            line.consignmentValue
        );
    }

    #isValidLines(data: NoteDTO) {
        return !data.lines || data.lines.length === 0;
    }

    #isValidQuantities(lines: NoteLineDTO[]): boolean {
        for (const line of lines) {
            if (line.isConsignment) {
                const total = line.goodQuantities + (line.badQuantities ?? 0);
                if (total > 1) return false;
            }
        }

        return true;
    }
}

type NoteDTO = {
    entryDate: string;
    userId: string;
    lines: NoteLineDTO[];
};

type NoteLineDTO = {
    itemId: string;
    goodQuantities: number;
    badQuantities?: number;
    comment?: string;
    isConsignment?: boolean;
    consignmentValue?: number;
};
