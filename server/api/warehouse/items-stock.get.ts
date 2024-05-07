import { ItemStock } from "~/lib/backend/domain/warehouse/item_stock";
import { makeServices } from "~/lib/backend/main";

const { warehouseService } = makeServices();

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
