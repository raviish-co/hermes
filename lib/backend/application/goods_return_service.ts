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
import { convertToIds } from "../shared/convert_to_ids";
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
        goodsIssueNoteId: string,
        securityDepositWithheld: number,
        itemsData: ItemData[]
    ): Promise<Either<GoodsReturnNoteError, void>> {
        const noteOrErr = await this.#goodsIssueRepository.getById(ID.fromString(goodsIssueNoteId));
        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        if (noteOrErr.value.isReturned()) return left(new GoodsIssueNoteHasBeenReturned());

        const voidOrErr = this.#verifyQuantities(itemsData, noteOrErr.value.lines);
        if (voidOrErr.isLeft()) return left(voidOrErr.value);

        const itemsIds = convertToIds(itemsData.map((item) => item.itemId));
        const itemsOrErr = await this.#itemRepository.findAll(itemsIds);
        if (itemsOrErr.isLeft()) return left(itemsOrErr.value);

        const returnLines = this.#buildReturnLines(itemsData, itemsOrErr.value);
        const noteId = await this.#buildReturnNoteId();
        const returnNote = new GoodsReturnNote(
            noteId,
            noteOrErr.value.noteId,
            returnLines,
            securityDepositWithheld
        );

        noteOrErr.value.returnTheGoods(returnLines);

        await this.#goodsIssueRepository.update(noteOrErr.value);

        await this.#goodsReturnRepository.save(returnNote);

        await this.#increaseStock(itemsIds, itemsData);

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

    async #buildReturnNoteId(): Promise<ID> {
        const sequence = await this.#generator.generate(Sequence.GoodsReturnNote);
        return ID.fromString(sequence);
    }

    #buildReturnLines(itemsData: ItemData[], items: Item[]): GoodsReturnNoteLine[] {
        const lines = [];
        for (const itemData of itemsData) {
            const item = items.find((item) => item.itemId.equals(ID.fromString(itemData.itemId)))!;
            lines.push(this.#buidReturnLine(item, itemData));
        }
        return lines;
    }

    #buidReturnLine(item: Item, itemData: ItemData) {
        return new GoodsReturnNoteLine(
            item.itemId,
            item.name,
            itemData.goodQuantities,
            itemData.badQuantities,
            item.variations,
            itemData.comment
        );
    }

    async #increaseStock(itemsIds: ID[], itemsData: ItemData[]) {
        const itemsStock = await this.#itemStockRepository.findAll(itemsIds);

        // if (itemsStockOrErr.isL) return left(itemsStockOrErr.value);

        // const itemsStock = itemsStockOrErr.value;

        for (const stock of itemsStock) {
            const data = itemsData.find((item) => stock.itemId.equals(ID.fromString(item.itemId)))!;
            stock.increase(data.goodQuantities, data.badQuantities);
        }

        this.#itemStockRepository.updateAll(itemsStock);
    }

    #verifyQuantities(items: ItemData[], lines: GoodsIssueNoteLine[]): Either<Error, void> {
        for (const item of items) {
            const line = this.#findGoodsIssueLine(ID.fromString(item.itemId), lines);

            if (!line) return left(new GoodsIssueLineNotFound());

            if (!line.checkQuantity(item.goodQuantities, item.badQuantities)) {
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
    goodQuantities: number;
    badQuantities?: number;
    comment?: string;
};
