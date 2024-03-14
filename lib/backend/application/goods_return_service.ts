import { InvalidGoodsIssueLineQuantity } from "../domain/goods_issue/invalid_goods_issue_line_quantity_error";
import type { GoodsIssueNoteRepository } from "../domain/goods_issue/goods_issue_note_repository";
import { GoodsIssueLineNotFound } from "../domain/goods_issue/goods_lssue_line_not_found_error";
import { GoodsReturnLine } from "../domain/goods_issue/goods_return_note_line";
import type { GoodsIssueLine } from "../domain/goods_issue/goods_issue_line";
import type { ItemRepository } from "../domain/catalog/item_repository";
import type { GoodsReturnNoteError } from "../shared/errors";
import { left, right, type Either } from "../shared/either";
import type { Item } from "../domain/catalog/item";
import { ID } from "../shared/id";

export class GoodsReturnService {
    #goodsIssueRepository: GoodsIssueNoteRepository;
    #itemRepository: ItemRepository;

    constructor(goodsIssueRepository: GoodsIssueNoteRepository, itemRepository: ItemRepository) {
        this.#goodsIssueRepository = goodsIssueRepository;
        this.#itemRepository = itemRepository;
    }

    async returningGoods(
        noteId: string,
        depositWithheld: string,
        itemsData: ItemData[]
    ): Promise<Either<GoodsReturnNoteError, void>> {
        const noteOrErr = await this.#goodsIssueRepository.getById(ID.fromString(noteId));
        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        const note = noteOrErr.value;
        const goodsIssueLines = note.goodsIssueLines;

        const voidOrErr = this.#verifyQuantities(itemsData, goodsIssueLines);
        if (voidOrErr.isLeft()) return left(voidOrErr.value);

        const returnLines = this.#buildReturnLines(itemsData);

        note.returnLines(returnLines);

        note.returnTheGoods(depositWithheld);

        await this.#goodsIssueRepository.update(note);

        const itemsIds = itemsData.map((item) => ID.fromString(item.itemId));
        const itemsOrErr = await this.#itemRepository.findAll(itemsIds);
        const items = <Item[]>itemsOrErr.value;

        this.#restoreItems(itemsData, items);

        await this.#itemRepository.updateAll(items);

        return right(undefined);
    }

    #buildReturnLines(data: ItemData[]) {
        const lines = [];
        for (const item of data) {
            const line = new GoodsReturnLine(ID.fromString(item.itemId), item.quantity);
            lines.push(line);
        }
        return lines;
    }

    #restoreItems(itemsData: ItemData[], items: Item[]) {
        itemsData.forEach((data) => {
            const item = items.find((item) => item.itemId.equals(ID.fromString(data.itemId)))!;

            item.updateStock(data.quantity);

            if (!data.comment) return;

            item.updateBadCondition(data.comment);
        });
    }

    #verifyQuantities(items: ItemData[], lines: GoodsIssueLine[]): Either<Error, void> {
        for (const item of items) {
            const line = this.#findGoodsIssueLine(ID.fromString(item.itemId), lines);

            if (!line) return left(new GoodsIssueLineNotFound());

            const isSameQuantity = line.checkQuantity(item.quantity);

            if (!isSameQuantity) return left(new InvalidGoodsIssueLineQuantity());
        }
        return right(undefined);
    }

    #findGoodsIssueLine(itemId: ID, lines: GoodsIssueLine[]): GoodsIssueLine {
        return lines.find((line) => line.itemId.equals(itemId))!;
    }
}

type ItemData = {
    itemId: string;
    quantity: number;
    comment?: string;
};
