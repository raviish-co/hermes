import type { GoodsIssueNoteRepository } from "../domain/goods_issue/goods_issue_note_repository";
import type { ItemStockRepository } from "../domain/warehouse/item_stock_repository";

export class DashboardService {
    #goodsIssueNoteRepository: GoodsIssueNoteRepository;
    #itemStockRepository: ItemStockRepository;

    constructor(
        noteRepository: GoodsIssueNoteRepository,
        itemStockRepository: ItemStockRepository
    ) {
        this.#goodsIssueNoteRepository = noteRepository;
        this.#itemStockRepository = itemStockRepository;
    }

    async totalExpiredGoodsIssueNotes(): Promise<number> {
        const notes = await this.#goodsIssueNoteRepository.getAll();

        if (notes.length === 0) return 0;

        const expiredNotes = notes.filter((note) => note.isExpired());

        return expiredNotes.length;
    }

    async totalInStockItems(): Promise<number> {
        const itemsInStock = await this.#itemStockRepository.findAllInStock();

        if (itemsInStock.length === 0) return 0;

        let total = 0;

        itemsInStock.forEach((i) => (total += i.total));

        return total;
    }

    async totalOutOfStockItems(): Promise<number> {
        const result = await this.#itemStockRepository.findAllOutOfStock();

        if (result.length === 0) return 0;

        return result.length;
    }
}
