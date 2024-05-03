import type { Generator } from "../adapters/sequences/generator";
import { Sequence } from "../adapters/sequences/sequence";
import type { Item } from "../domain/catalog/items/item";
import type { ItemRepository } from "../domain/catalog/items/item_repository";
import { GoodsReceiptNoteBuilder } from "../domain/goods_receipt/goods_receipt_note_builder";
import { GoodsReceiptNoteLine } from "../domain/goods_receipt/goods_receipt_note_line";
import type { GoodsReceiptNoteRepository } from "../domain/goods_receipt/goods_receipt_note_repository";
import { InvalidEntryDate } from "../domain/goods_receipt/invalid_entry_date_error";
import { InvalidLines } from "../domain/goods_receipt/invalid_lines_error";
import type { ItemStock } from "../domain/warehouse/item_stock";
import type { ItemStockRepository } from "../domain/warehouse/item_stock_repository";
import { left, right, type Either } from "../shared/either";
import type { GoodsReceiptError } from "../shared/errors";
import { ID } from "../shared/id";

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

    async new(data: GoodsReceiptDTO): Promise<Either<GoodsReceiptError, void>> {
        if (!data.entryDate) return left(new InvalidEntryDate(data.entryDate));
        if (this.#isValidLines(data)) return left(new InvalidLines());

        const itemsIds = this.#buildItemsIds(data.lines);
        const itemsOrErr = await this.#itemRepository.findAll(itemsIds);
        if (itemsOrErr.isLeft()) return left(itemsOrErr.value);

        const itemStocks = await this.#itemStockRepository.findAll(itemsIds);

        this.#incrementItemsStock(itemStocks, data.lines);

        this.#updateItemsCondition(itemsOrErr.value, data.lines);

        const lines = this.#buildLines(data.lines);
        const noteId = this.#generator.generate(Sequence.GoodsReceiptNote);
        const noteOrErr = new GoodsReceiptNoteBuilder()
            .withNoteId(noteId)
            .withEntryDate(data.entryDate)
            .withUser(data.userId)
            .withLines(lines)
            .build();

        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        this.#noteRepository.save(noteOrErr.value);

        this.#itemStockRepository.updateAll(itemStocks);

        this.#itemRepository.updateAll(itemsOrErr.value);

        return right(undefined);
    }

    #isValidLines(data: GoodsReceiptDTO) {
        return !data.lines || data.lines.length === 0;
    }

    #buildItemsIds(linesDTO: GoodsReceiptLineDTO[]): ID[] {
        return linesDTO.map((line) => ID.fromString(line.itemId));
    }

    #incrementItemsStock(items: ItemStock[], lines: GoodsReceiptLineDTO[]) {
        items.forEach((i, idx) =>
            i.incrementStock(lines[idx].goodQuantities, lines[idx].badQuantities)
        );
    }

    #buildLines(lines: GoodsReceiptLineDTO[]): GoodsReceiptNoteLine[] {
        return lines.map(
            (line) =>
                new GoodsReceiptNoteLine(
                    ID.fromString(line.itemId),
                    line.goodQuantities,
                    line.badQuantities
                )
        );
    }

    #updateItemsCondition(items: Item[], lines: GoodsReceiptLineDTO[]) {
        lines.forEach((line, idx) => {
            if (!line.condition) return;

            items[idx].updateCondition(line.condition.status, line.condition.comment);
        });
    }
}

type GoodsReceiptDTO = {
    lines: GoodsReceiptLineDTO[];
    userId: string;
    entryDate: string;
};

type GoodsReceiptLineDTO = {
    itemId: string;
    goodQuantities: number;
    badQuantities?: number;
    condition?: Condition;
};

type Condition = {
    status: string;
    comment?: string;
};
