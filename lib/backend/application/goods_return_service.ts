import { GoodsIssueNoteHasBeenReturned } from "../domain/goods_issue/goods_issue_note_has_been_returned_error";
import { InvalidGoodsIssueLineQuantity } from "../domain/goods_issue/invalid_goods_issue_line_quantity_error";
import type { GoodsReturnNoteNotFound } from "../domain/goods_return/goods_return_note_not_found_error";
import type { GoodsReturnNoteRepository } from "../domain/goods_return/goods_return_note_repository";
import type { GoodsIssueNoteRepository } from "../domain/goods_issue/goods_issue_note_repository";
import { GoodsIssueLineNotFound } from "../domain/goods_issue/goods_lssue_line_not_found_error";
import { GoodsReturnNoteLine } from "../domain/goods_return/goods_return_note_line";
import type { GoodsIssueNoteLine } from "../domain/goods_issue/goods_issue_note_line";
import type { ItemRepository } from "../domain/catalog/items/item_repository";
import { GoodsReturnNote } from "../domain/goods_return/goods_return_note";
import type { Generator } from "../adapters/sequences/generator";
import type { GoodsReturnNoteError } from "../shared/errors";
import { left, right, type Either } from "../shared/either";
import { Sequence } from "../adapters/sequences/sequence";
import type { Item } from "../domain/catalog/items/item";
import { ID } from "../shared/id";

export class GoodsReturnService {
    #goodsIssueRepository: GoodsIssueNoteRepository;
    #goodsReturnRepository: GoodsReturnNoteRepository;
    #itemRepository: ItemRepository;
    #generator: Generator;

    constructor(
        goodsIssueRepository: GoodsIssueNoteRepository,
        itemRepository: ItemRepository,
        goodsReturnRepository: GoodsReturnNoteRepository,
        generator: Generator
    ) {
        this.#goodsIssueRepository = goodsIssueRepository;
        this.#itemRepository = itemRepository;
        this.#goodsReturnRepository = goodsReturnRepository;
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
        const goodsIssueLines = note.lines;

        if (note.isReturned()) return left(new GoodsIssueNoteHasBeenReturned());

        const voidOrErr = this.#verifyQuantities(itemsData, goodsIssueLines);
        if (voidOrErr.isLeft()) return left(voidOrErr.value);

        const itemsIds = itemsData.map((item) => ID.fromString(item.itemId));
        const itemsOrErr = await this.#itemRepository.findAll(itemsIds);
        const items = <Item[]>itemsOrErr.value;

        const returnNoteId = this.#buildReturnNoteId();
        const returnLines = this.#buildReturnLines(itemsData, items);

        const returnNote = new GoodsReturnNote(
            returnNoteId,
            note.goodsIssueNoteId,
            returnLines,
            securityDepositWithheld
        );

        note.returnTheGoods(returnLines);

        await this.#goodsIssueRepository.update(note);

        await this.#goodsReturnRepository.save(returnNote);

        this.#restoreItems(itemsData, items);

        await this.#itemRepository.updateAll(items);

        return right(undefined);
    }

    async list(): Promise<GoodsReturnNote[]> {
        return await this.#goodsReturnRepository.getAll();
    }

    async get(
        goodsReturnNoteId: string
    ): Promise<Either<GoodsReturnNoteNotFound, GoodsReturnNote>> {
        const noteId = ID.fromString(goodsReturnNoteId);

        const noteOrErr = await this.#goodsReturnRepository.getById(noteId);
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
                ID.fromString(itemData.itemId),
                item.name,
                itemData.quantity,
                item.variations,
                itemData.comment
            );

            lines.push(line);
        }
        return lines;
    }

    #restoreItems(itemsData: ItemData[], items: Item[]): void {
        itemsData.forEach((data) => {
            const item = items.find((item) => item.itemId.equals(ID.fromString(data.itemId)))!;

            item.updateStock(data.quantity);

            if (!data.comment) return;

            item.updateBadCondition(data.comment);
        });
    }

    #verifyQuantities(items: ItemData[], lines: GoodsIssueNoteLine[]): Either<Error, void> {
        for (const item of items) {
            const line = this.#findGoodsIssueLine(ID.fromString(item.itemId), lines);

            if (!line) return left(new GoodsIssueLineNotFound());

            const isSameQuantity = line.checkQuantity(item.quantity);

            if (!isSameQuantity) return left(new InvalidGoodsIssueLineQuantity());
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
