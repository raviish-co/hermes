import type { ItemRepository } from "../domain/catalog/items/item_repository";
import type { GoodsIssueNoteRepository } from "../domain/goods_issue/goods_issue_note_repository";
import type { ItemStockRepository } from "../domain/warehouse/item_stock_repository";
import { Decimal } from "../shared/decimal";

export class DashboardService {
    #goodsIssueNoteRepository: GoodsIssueNoteRepository;
    #itemRepository: ItemRepository;
    #itemStockRepository: ItemStockRepository;

    constructor(
        noteRepository: GoodsIssueNoteRepository,
        itemRepository: ItemRepository,
        itemStockRepository: ItemStockRepository
    ) {
        this.#goodsIssueNoteRepository = noteRepository;
        this.#itemRepository = itemRepository;
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

    async totalInventoryValue(): Promise<Decimal> {
        const result = await this.#calculateInventoryValue();
        return result;
    }

    async #calculateInventoryValue(): Promise<Decimal> {
        let total = new Decimal(0);

        const items = await this.#itemRepository.getAll();

        if (items.length === 0) return total;

        const itemStocks = await this.#itemStockRepository.findAllInStock();

        items.forEach((item) => {
            const itemStock = itemStocks.find((i) => i.itemId.equals(item.itemId));

            if (!itemStock) return;

            const quantity = new Decimal(itemStock.total);

            total = total.add(item.price.multiply(quantity));
        });

        return total;
    }
}
