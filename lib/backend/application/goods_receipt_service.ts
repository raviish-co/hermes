import { left, right, type Either } from "../shared/either";
import { ID } from "../shared/id";
import type { ItemRepository } from "../domain/catalog/item_repository";
import type { Item } from "../domain/catalog/item";
import { SequenceGenerator } from "../domain/sequences/sequence_generator";
import { Sequence } from "../domain/sequences/sequence";
import type { GoodsReceiptError } from "../shared/errors";
import { InvalidLines } from "../domain/goods_receipt/invalid_lines_error";
import { InvalidEntryDate } from "../domain/goods_receipt/invalid_entry_date_error";
import type { GoodsReceiptNoteRepository } from "../domain/goods_receipt/goods_receipt_note_repository";
import { GoodsReceiptBuilder } from "../domain/goods_receipt/goods_receipt_builder";
import { GoodsReceiptLine } from "../domain/goods_receipt/goods_receipt_line";

export class GoodsReceiptService {
    readonly #itemRepository: ItemRepository;
    readonly #goodsReceiptNoteRepository: GoodsReceiptNoteRepository;
    readonly #generator: SequenceGenerator;

    constructor(
        itemRepository: ItemRepository,
        goodsReceiptNoteRepository: GoodsReceiptNoteRepository,
        generator: SequenceGenerator
    ) {
        this.#itemRepository = itemRepository;
        this.#goodsReceiptNoteRepository = goodsReceiptNoteRepository;
        this.#generator = generator;
    }

    async new(data: GoodsReceiptDTO): Promise<Either<GoodsReceiptError, void>> {
        if (!data.entryDate) return left(new InvalidEntryDate(data.entryDate));

        if (this.#isValidLines(data)) return left(new InvalidLines());

        const itemsIds = this.#buildItemsIds(data.lines);

        const itemsOrError = await this.#itemRepository.findAll(itemsIds);
        if (itemsOrError.isLeft()) return left(itemsOrError.value);

        this.#incrementItemsStock(itemsOrError.value, data.lines);

        this.#updateItemsCondition(itemsOrError.value, data.lines);

        this.#itemRepository.updateAll(itemsOrError.value);

        const lines = this.#buildLines(itemsIds, data.lines);
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

    #buildLines(itemsIds: ID[], lines: GoodsReceiptLineDTO[]): GoodsReceiptLine[] {
        return lines.map((line, idx) => new GoodsReceiptLine(itemsIds[idx], line.quantity));
    }

    #updateItemsCondition(items: Item[], lines: GoodsReceiptLineDTO[]) {
        lines.forEach((line, idx) => {
            if (!line.condition) return;

            items[idx].updateCondition(line.condition.status, line.condition.comment);
        });
    }
}

export type GoodsReceiptDTO = {
    lines: GoodsReceiptLineDTO[];
    userId: string;
    entryDate: string;
};

export type GoodsReceiptLineDTO = {
    itemId: string;
    quantity: number;
    condition?: Condition;
};

type Condition = {
    status: string;
    comment?: string;
};
