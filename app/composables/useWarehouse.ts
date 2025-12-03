import { ItemStockType } from "@backend/domain/warehouse/item_stock_type";
import type { ItemStockModel } from "@frontend/models/item_stock";
import { WarehouseService } from "@frontend/services/warehouse_service";

const warehouseService = new WarehouseService();

export function useWarehouse() {
    const itemStocks = ref<ItemStockModel[]>([]);

    const listItemsStock = async () => {
        itemStocks.value = await warehouseService.listItemStock();
    };

    const findItemStock = (id: string) => {
        return itemStocks.value.find((itemStock) => itemStock.itemId === id);
    };

    const markItemInStockAsIntern = async (itemId: string) => {
        await warehouseService.markItemInStockAsIntern(itemId);
    };

    const isInternalItemStock = (itemId: string): boolean => {
        const itemStock = findItemStock(itemId);

        if (!itemStock) return false;

        return (
            itemStock.itemStockType === ItemStockType.Consignacao &&
            itemStock.totalValueOfOutputs >= itemStock.consignmentValue
        );
    };

    const isConsignmentItemStock = (itemId: string): boolean => {
        const itemStock = findItemStock(itemId);

        if (!itemStock) return false;

        return itemStock.itemStockType === ItemStockType.Consignacao;
    };

    return {
        listItemsStock,
        findItemStock,
        markItemInStockAsIntern,
        isInternalItemStock,
        isConsignmentItemStock,
    };
}
