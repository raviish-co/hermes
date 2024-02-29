import { InvalidGoodsIssueLineQuantity } from "../domain/goods_issue/invalid_goods_issue_line_quantity_error";
import type { GoodsIssueRepository } from "../domain/goods_issue/goods_issue_note_repository";
import type { GoodsReturnNoteRepository } from "../domain/goods_return_note_repository";
import type { SequenceGenerator } from "../domain/sequences/sequence_generator";
import type { GoodsIssueLine } from "../domain/goods_issue/goods_issue_line";
import type { ItemRepository } from "../domain/catalog/item_repository";
import { GoodsReturnNote } from "../domain/goods_return_note";
import type { GoodsReturnNoteError } from "../shared/errors";
import { left, right, type Either } from "../shared/either";
import { Sequence } from "../domain/sequences/sequence";
import type { Item } from "../domain/catalog/item";
import { ID } from "../shared/id";

export class GoodsReturnService {
    #goodsReturnsNoteRepository: GoodsReturnNoteRepository;
    #goodsIssueRepository: GoodsIssueRepository;
    #itemRepository: ItemRepository;
    #sequenceGenerator: SequenceGenerator;

    constructor(
        goodsReturnsNoteRepository: GoodsReturnNoteRepository,
        goodsIssueRepository: GoodsIssueRepository,
        itemRepository: ItemRepository,
        sequenceGenerator: SequenceGenerator
    ) {
        this.#goodsReturnsNoteRepository = goodsReturnsNoteRepository;
        this.#goodsIssueRepository = goodsIssueRepository;
        this.#itemRepository = itemRepository;
        this.#sequenceGenerator = sequenceGenerator;
    }

    async returningGoods(
        noteId: string,
        securityDepositWithHeld: string,
        itemsData: ItemData[]
    ): Promise<Either<GoodsReturnNoteError, void>> {
        const noteOrErr = await this.#goodsIssueRepository.getById(ID.fromString(noteId));
        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        const note = noteOrErr.value;
        const lines = note.goodsIssueLines;

        const voidOrErr = this.#verifyItemsQuantities(itemsData, lines);
        if (voidOrErr.isLeft()) return left(voidOrErr.value);

        const items = lines.map((line) => line.item);

        const goodsReturnNoteId = this.#generateGoodsReturnNoteId();
        const goodsReturnNote = new GoodsReturnNote(
            goodsReturnNoteId,
            note.goodsIssueNoteId,
            securityDepositWithHeld
        );

        this.#restoreItemsQuantities(lines);

        this.#updateItemsCondition(items, itemsData);

        await this.#goodsReturnsNoteRepository.save(goodsReturnNote);

        await this.#itemRepository.saveAll(items);

        note.returnTheGoods();

        await this.#goodsIssueRepository.update(note);

        return right(undefined);
    }

    #generateGoodsReturnNoteId(): ID {
        const goodsReturnId = this.#sequenceGenerator.generate(Sequence.GoodsReturnNote);
        return ID.fromString(goodsReturnId);
    }

    #restoreItemsQuantities(lines: GoodsIssueLine[]) {
        for (const line of lines) {
            line.restoreQuantity();
        }
    }

    #updateItemsCondition(items: Item[], itemsData: ItemData[]) {
        for (const itemData of itemsData) {
            const item = items.find((item) => item.itemId.toString() === itemData.itemId)!;
            if (!itemData.comment) return;
            item.updateBadCondition(itemData.comment);
        }
    }

    #verifyItemsQuantities(
        items: ItemData[],
        lines: GoodsIssueLine[]
    ): Either<InvalidGoodsIssueLineQuantity, void> {
        for (const item of items) {
            const line = this.#findGoodsIssueLine(item.itemId, lines);
            const isSameQuantity = this.#checkQuantity(line!, item.quantity);
            if (!isSameQuantity) return left(new InvalidGoodsIssueLineQuantity());
        }
        return right(undefined);
    }

    #findGoodsIssueLine(itemId: string, lines: GoodsIssueLine[]): GoodsIssueLine {
        return lines.find((line) => line.item.itemId.toString() === itemId)!;
    }

    #checkQuantity(line: GoodsIssueLine, quantity: number): boolean {
        return line.quantity === quantity;
    }

    #getItemsIds(lines: GoodsIssueLine[]): ID[] {
        return lines.map((line) => line.item.itemId);
    }
}

type ItemData = {
    itemId: string;
    quantity: number;
    comment?: string;
};
