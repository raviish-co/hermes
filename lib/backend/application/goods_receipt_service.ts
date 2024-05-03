import type { Generator } from "../adapters/sequences/generator";
import { Sequence } from "../adapters/sequences/sequence";
import type { Item } from "../domain/catalog/items/item";
import type { ItemRepository } from "../domain/catalog/items/item_repository";
import { GoodsReceiptBuilder } from "../domain/goods_receipt/goods_receipt_builder";
import { GoodsReceiptLine } from "../domain/goods_receipt/goods_receipt_line";
import type { GoodsReceiptNoteRepository } from "../domain/goods_receipt/goods_receipt_note_repository";
import { InvalidEntryDate } from "../domain/goods_receipt/invalid_entry_date_error";
import { InvalidLines } from "../domain/goods_receipt/invalid_lines_error";
import { left, right, type Either } from "../shared/either";
import type { GoodsReceiptError } from "../shared/errors";
import { ID } from "../shared/id";

export class GoodsReceiptService {
    #itemRepository: ItemRepository;
    #goodsReceiptNoteRepository: GoodsReceiptNoteRepository;
    #generator: Generator;

    constructor(
        itemRepository: ItemRepository,
        goodsReceiptNoteRepository: GoodsReceiptNoteRepository,
        generator: Generator
    ) {
        this.#itemRepository = itemRepository;
        this.#goodsReceiptNoteRepository = goodsReceiptNoteRepository;
        this.#generator = generator;
    }

    async new(data: GoodsReceiptDTO): Promise<Either<GoodsReceiptError, void>> {
        if (!data.entryDate) return left(new InvalidEntryDate(data.entryDate));

        if (this.#isValidLines(data)) return left(new InvalidLines());

        const itemsIds = this.#buildItemsIds(data.lines);

        const itemsOrErr = await this.#itemRepository.findAll(itemsIds);
        if (itemsOrErr.isLeft()) return left(itemsOrErr.value);

        this.#incrementItemsStock(itemsOrErr.value, data.lines);

        this.#updateItemsCondition(itemsOrErr.value, data.lines);

        this.#itemRepository.updateAll(itemsOrErr.value);

        const lines = this.#buildLines(data.lines);
        const noteId = this.#generator.generate(Sequence.GoodsReceiptNote);
        const noteOrErr = new GoodsReceiptBuilder()
            .withGoodsReceiptNoteId(noteId)
            .withEntryDate(data.entryDate)
            .withUser(data.userId)
            .withLines(lines)
            .build();
        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        this.#goodsReceiptNoteRepository.save(noteOrErr.value);

        return right(undefined);
    }

    #isValidLines(data: GoodsReceiptDTO) {
        return !data.lines || data.lines.length === 0;
    }

    #buildItemsIds(linesDTO: GoodsReceiptLineDTO[]): ID[] {
        return linesDTO.map((line) => ID.fromString(line.itemId));
    }

    #incrementItemsStock(items: Item[], lines: GoodsReceiptLineDTO[]) {
        items.forEach((item, idx) => item.incrementStock(lines[idx].quantity));
    }

    #buildLines(lines: GoodsReceiptLineDTO[]): GoodsReceiptLine[] {
        return lines.map((line) => new GoodsReceiptLine(ID.fromString(line.itemId), line.quantity));
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
    quantity: number;
    condition?: Condition;
};

type Condition = {
    status: string;
    comment?: string;
};
