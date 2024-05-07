import type { ItemStockModel } from "../models/item_stock";

export class WarehouseService {
    async listItemStock(): Promise<ItemStockModel[]> {
        const result = $fetch("/api/warehouse/items-stock");
        return result;
    }
}
