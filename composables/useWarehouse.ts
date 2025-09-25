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

    const updateItemStockStatus = async (itemId: string) => {
        await warehouseService.updateItemStockStatus(itemId);
    };

    const isInternalItemStock = (itemId: string): boolean => {
        const itemStock = findItemStock(itemId);

        if (!itemStock) return false;

        return (
            itemStock.itemStockType !== "Interno" &&
            itemStock.totalValueOfOutputs > itemStock.consignmentValue
        );
    };

    return {
        listItemsStock,
        findItemStock,
        enableItemStockToInternalUse: updateItemStockStatus,
        isInternalItemStock,
    };
}
