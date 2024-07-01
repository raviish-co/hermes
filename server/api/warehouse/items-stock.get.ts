import { useWarehouseService } from "~/composables/useWarehouseService";
import { ItemStock } from "~/lib/backend/domain/warehouse/item_stock";

const warehouseService = useWarehouseService();

interface ItemStockDTO {
    itemId: string;
    goodQuantities: number;
    badQuantities: number;
    total: number;
}

function toItemStockDTO(stock: ItemStock): ItemStockDTO {
    return {
        itemId: stock.itemId.toString(),
        goodQuantities: stock.goodQuantities,
        badQuantities: stock.badQuantities,
        total: stock.total,
    };
}

export default defineEventHandler(async (event) => {
    const itemsStock = await warehouseService.listItemStock();
    return itemsStock.map(toItemStockDTO);
});
