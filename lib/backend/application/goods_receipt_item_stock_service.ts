import type { GoodsReceiptNoteRepository } from "../domain/goods_receipt/goods_receipt_note_repository";
import type { ItemStockRepository } from "../domain/warehouse/item_stock_repository";
import { left, right, type Either } from "../shared/either";
import { ID } from "../shared/id";
import { NoteLineNotFoundError } from "./note_line_not_found_error";

export class GoodsReceiptItemStockService {
    readonly #noteRepository: GoodsReceiptNoteRepository;
    readonly #itemStockRepository: ItemStockRepository;

    constructor(
        noteRepository: GoodsReceiptNoteRepository,
        itemStockRepository: ItemStockRepository
    ) {
        this.#noteRepository = noteRepository;
        this.#itemStockRepository = itemStockRepository;
    }

    async updateItemStockStatus(itemId: string, noteId: string): Promise<Either<Error, void>> {
        const itemStockOrErr = await this.#itemStockRepository.getById(ID.fromString(itemId));
        if (itemStockOrErr.isLeft()) {
            return left(itemStockOrErr.value);
        }

        const noteOrErr = await this.#noteRepository.getById(ID.fromString(noteId));
        if (noteOrErr.isLeft()) {
            return left(noteOrErr.value);
        }

        const noteLine = noteOrErr.value.lines.find((line) => line.itemId.toString() === itemId);
        if (!noteLine) {
            return left(
                new NoteLineNotFoundError("GoodsReceiptItemStockService:updateItemStock", itemId)
            );
        }

        const itemStock = itemStockOrErr.value;

        if (itemStock.isTotalCostOfDeparturesGreaterThan(noteLine?.consignmentPrice)) {
            itemStock.updateStatusToInternal();
        }

        await this.#itemStockRepository.save(itemStock);

        return right(undefined);
    }
}
