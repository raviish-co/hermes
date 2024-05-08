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
        return await this.#calculateTotalItemsInStock();
    }

    async totalOutOfStockItems(): Promise<number> {
        const result = await this.#itemStockRepository.findAllOutOfStock();
        return result.length;
    }

    async totalInventoryValue(): Promise<Decimal> {
        return await this.#calculateInventoryValue();
    }

    async percentageOfItemsInStock(): Promise<ItemStockPercentage> {
        return await this.#calculatePercentageOfItemsInStock();
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

    async #calculateTotalItemsInStock(): Promise<number> {
        const itemStocks = await this.#itemStockRepository.findAllInStock();

        if (itemStocks.length === 0) return 0;

        let total = 0;

        itemStocks.forEach((i) => (total += i.total));

        return total;
    }

    async #calculatePercentageOfItemsInStock(): Promise<ItemStockPercentage> {
        const result = await this.#calculateTotalItemsInStock();

        if (result === 0) return { goodPercentage: 0, badPercentage: 0 };

        let total = 0;

        const itemStocks = await this.#itemStockRepository.findAllInStock();

        itemStocks.forEach((i) => (total += i.goodQuantities));

        const goodPercentage = (total / result) * PERCENT;

        const badPercentage = PERCENT - goodPercentage;

        return { goodPercentage, badPercentage };
    }
}

const PERCENT = 100;

type ItemStockPercentage = {
    goodPercentage: number;
    badPercentage: number;
};
