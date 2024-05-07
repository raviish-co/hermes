import type { Generator } from "../adapters/sequences/generator";
import { Sequence } from "../adapters/sequences/sequence";
import type { Item } from "../domain/catalog/items/item";
import type { ItemRepository } from "../domain/catalog/items/item_repository";
import { GoodsIssueNoteHasBeenReturned } from "../domain/goods_issue/goods_issue_note_has_been_returned_error";
import type { GoodsIssueNoteLine } from "../domain/goods_issue/goods_issue_note_line";
import type { GoodsIssueNoteRepository } from "../domain/goods_issue/goods_issue_note_repository";
import { GoodsIssueLineNotFound } from "../domain/goods_issue/goods_lssue_line_not_found_error";
import { InvalidGoodsIssueLineQuantity } from "../domain/goods_issue/invalid_goods_issue_line_quantity_error";
import { GoodsReturnNote } from "../domain/goods_return/goods_return_note";
import { GoodsReturnNoteLine } from "../domain/goods_return/goods_return_note_line";
import type { GoodsReturnNoteNotFound } from "../domain/goods_return/goods_return_note_not_found_error";
import type { GoodsReturnNoteRepository } from "../domain/goods_return/goods_return_note_repository";
import type { ItemStockRepository } from "../domain/warehouse/item_stock_repository";
import { left, right, type Either } from "../shared/either";
import type { GoodsReturnNoteError } from "../shared/errors";
import { ID } from "../shared/id";

export class GoodsReturnService {
    #goodsIssueRepository: GoodsIssueNoteRepository;
    #goodsReturnRepository: GoodsReturnNoteRepository;
    #itemRepository: ItemRepository;
    #itemStockRepository: ItemStockRepository;
    #generator: Generator;

    constructor(
        goodsReturnRepository: GoodsReturnNoteRepository,
        goodsIssueRepository: GoodsIssueNoteRepository,
        itemRepository: ItemRepository,
        itemStockRepository: ItemStockRepository,
        generator: Generator
    ) {
        this.#goodsReturnRepository = goodsReturnRepository;
        this.#goodsIssueRepository = goodsIssueRepository;
        this.#itemRepository = itemRepository;
        this.#itemStockRepository = itemStockRepository;
        this.#generator = generator;
    }

    async returningGoods(
        noteId: string,
        securityDepositWithheld: number,
        itemsData: ItemData[]
    ): Promise<Either<GoodsReturnNoteError, void>> {
        const noteOrErr = await this.#goodsIssueRepository.getById(ID.fromString(noteId));
        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        const note = noteOrErr.value;
        if (note.isReturned()) return left(new GoodsIssueNoteHasBeenReturned());

        const voidOrErr = this.#verifyQuantities(itemsData, note.lines);
        if (voidOrErr.isLeft()) return left(voidOrErr.value);

        const itemsIds = itemsData.map((item) => ID.fromString(item.itemId));
        const itemsOrErr = await this.#itemRepository.findAll(itemsIds);
        if (itemsOrErr.isLeft()) return left(itemsOrErr.value);

        await this.#increaseStock(itemsIds, itemsData);

        const returnNoteId = this.#buildReturnNoteId();
        const returnLines = this.#buildReturnLines(itemsData, itemsOrErr.value);

        const returnNote = new GoodsReturnNote(
            returnNoteId,
            note.goodsIssueNoteId,
            returnLines,
            securityDepositWithheld
        );

        note.returnTheGoods(returnLines);

        await this.#goodsIssueRepository.update(note);

        await this.#goodsReturnRepository.save(returnNote);

        this.#restoreItems(itemsData, itemsOrErr.value);

        await this.#itemRepository.updateAll(itemsOrErr.value);

        return right(undefined);
    }

    async list(): Promise<GoodsReturnNote[]> {
        return await this.#goodsReturnRepository.getAll();
    }

    async get(noteId: string): Promise<Either<GoodsReturnNoteNotFound, GoodsReturnNote>> {
        const noteOrErr = await this.#goodsReturnRepository.getById(ID.fromString(noteId));
        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        return right(noteOrErr.value);
    }

    #buildReturnNoteId(): ID {
        const noteId = this.#generator.generate(Sequence.GoodsReturnNote);
        return ID.fromString(noteId);
    }

    #buildReturnLines(itemsData: ItemData[], items: Item[]): GoodsReturnNoteLine[] {
        const lines = [];
        for (const itemData of itemsData) {
            const item = items.find((item) => item.itemId.equals(ID.fromString(itemData.itemId)))!;

            const line = new GoodsReturnNoteLine(
                item.itemId,
                item.name,
                itemData.quantity,
                item.variations,
                itemData.comment
            );

            lines.push(line);
        }
        return lines;
    }

    async #increaseStock(itemsIds: ID[], itemsData: ItemData[]) {
        const itemsStock = await this.#itemStockRepository.findAll(itemsIds);

        for (const stock of itemsStock) {
            const data = itemsData.find((item) => stock.itemId.equals(ID.fromString(item.itemId)))!;
            stock.increase(data.quantity);
        }

        this.#itemStockRepository.updateAll(itemsStock);
    }

    // Apagar isso quando a condição for adicionada a linha de devolução
    #restoreItems(itemsData: ItemData[], items: Item[]): void {
        itemsData.forEach((data) => {
            const item = items.find((item) => item.itemId.equals(ID.fromString(data.itemId)))!;

            if (!data.comment) return;

            item.updateBadCondition(data.comment);
        });
    }

    #verifyQuantities(items: ItemData[], lines: GoodsIssueNoteLine[]): Either<Error, void> {
        for (const item of items) {
            const line = this.#findGoodsIssueLine(ID.fromString(item.itemId), lines);

            if (!line) return left(new GoodsIssueLineNotFound());

            if (!line.checkQuantity(item.quantity)) {
                return left(new InvalidGoodsIssueLineQuantity());
            }
        }
        return right(undefined);
    }

    #findGoodsIssueLine(itemId: ID, lines: GoodsIssueNoteLine[]): GoodsIssueNoteLine {
        return lines.find((line) => line.itemId.equals(itemId))!;
    }
}

type ItemData = {
    itemId: string;
    quantity: number;
    comment?: string;
};
