import type { ItemStockRepository } from "../domain/warehouse/item_stock_repository";

export class WarehouseService {
    #itemStockRepository: ItemStockRepository;

    constructor(itemStockRepository: ItemStockRepository) {
        this.#itemStockRepository = itemStockRepository;
    }

    async listItemStock() {
        return await this.#itemStockRepository.getAll();
    }
}
