import type { ItemStockRepository } from "../domain/warehouse/item_stock_repository";
import { left, right, type Either } from "../shared/either";
import { ID } from "../shared/id";

export class WarehouseService {
    #itemStockRepository: ItemStockRepository;

    constructor(itemStockRepository: ItemStockRepository) {
        this.#itemStockRepository = itemStockRepository;
    }

    async listItemStock() {
        return await this.#itemStockRepository.getAll();
    }

    async updateItemStockStatus(itemId: string): Promise<Either<Error, void>> {
        const itemStockOrErr = await this.#itemStockRepository.getById(ID.fromString(itemId));
        if (itemStockOrErr.isLeft()) {
            return left(itemStockOrErr.value);
        }

        const itemStock = itemStockOrErr.value;

        if (itemStock.isTotalCostOfDeparturesGreaterThan(itemStock.consignmentPrice)) {
            itemStock.updateStatusToInternal();
        }

        await this.#itemStockRepository.save(itemStock);

        return right(undefined);
    }
}
