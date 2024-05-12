import type { ItemStockModel } from "~/lib/frontend/models/item_stock";
import { WarehouseService } from "~/lib/frontend/services/warehouse_service";

const warehouseService = new WarehouseService();

export function useWarehouse() {
    const itemStocks = ref<ItemStockModel[]>([]);

    const listItemsStock = async () => {
        itemStocks.value = await warehouseService.listItemStock();
    };

    const findItemStock = (id: string) => {
        return itemStocks.value.find((itemStock) => itemStock.itemId === id);
    };

    return {
        listItemsStock,
        findItemStock,
    };
}
