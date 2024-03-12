import { InvalidGoodsIssueLineQuantity } from "../domain/goods_issue/invalid_goods_issue_line_quantity_error";
import type { GoodsIssueNoteRepository } from "../domain/goods_issue/goods_issue_note_repository";
import type { GoodsReturnNoteRepository } from "../domain/goods_return_note_repository";
import type { SequenceGenerator } from "../domain/sequences/sequence_generator";
import type { GoodsIssueLine } from "../domain/goods_issue/goods_issue_line";
import type { ItemRepository } from "../domain/catalog/item_repository";
import { GoodsReturnLine, GoodsReturnNote } from "../domain/goods_return_note";
import type { GoodsReturnNoteError } from "../shared/errors";
import { left, right, type Either } from "../shared/either";
import { Sequence } from "../domain/sequences/sequence";
import type { Item } from "../domain/catalog/item";
import { ID } from "../shared/id";

export class GoodsReturnService {
    #goodsReturnsNoteRepository: GoodsReturnNoteRepository;
    #goodsIssueRepository: GoodsIssueNoteRepository;
    #itemRepository: ItemRepository;
    #sequenceGenerator: SequenceGenerator;

    constructor(
        goodsReturnsNoteRepository: GoodsReturnNoteRepository,
        goodsIssueRepository: GoodsIssueNoteRepository,
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
        securityDepositToBeRetained: string,
        itemsData: ItemData[]
    ): Promise<Either<GoodsReturnNoteError, void>> {
        const noteOrErr = await this.#goodsIssueRepository.getById(ID.fromString(noteId));
        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        const note = noteOrErr.value;
        const goodsIssueLines = note.goodsIssueLines;

        const voidOrErr = this.#verifyQuantities(itemsData, goodsIssueLines);
        if (voidOrErr.isLeft()) return left(voidOrErr.value);

        const goodsReturnNoteId = this.#generateGoodsReturnNoteId();

        const returnLines = this.#buildReturnLines(itemsData, goodsReturnNoteId);

        const goodsReturnNote = new GoodsReturnNote(
            goodsReturnNoteId,
            note.goodsIssueNoteId,
            securityDepositToBeRetained,
            returnLines
        );

        note.returnTheGoods();

        await this.#goodsReturnsNoteRepository.save(goodsReturnNote);

        await this.#restoreStockQuantities(itemsData);

        await this.#goodsIssueRepository.update(note);

        return right(undefined);
    }

    #generateGoodsReturnNoteId(): ID {
        const goodsReturnId = this.#sequenceGenerator.generate(Sequence.GoodsReturnNote);
        return ID.fromString(goodsReturnId);
    }

    #buildReturnLines(data: ItemData[], goodsReturnNoteId: ID) {
        const lines = [];
        for (const itemData of data) {
            const line = new GoodsReturnLine(goodsReturnNoteId, itemData.quantity);
            lines.push(line);
        }
        return lines;
    }

    async #restoreStockQuantities(itemsData: ItemData[]) {
        const itemsIds = itemsData.map((item) => ID.fromString(item.itemId));
        const itemsOrErr = await this.#itemRepository.findAll(itemsIds);

        if (itemsOrErr.isLeft()) return;

        const items = itemsOrErr.value;

        for (const data of itemsData) {
            const item = items.find((item) => item.itemId.toString() === data.itemId)!;
            item.updateStock(data.quantity);

            if (!data.comment) return;
            item.updateBadCondition(data.comment);
        }

        await this.#itemRepository.updateAll(items);
    }

    #verifyQuantities(
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
        return line.quantity >= quantity;
    }
}

type ItemData = {
    itemId: string;
    quantity: number;
    comment?: string;
};
