import { useWarehouseService } from "~/composables/useWarehouseService";
import { ItemStock } from "~/lib/backend/domain/warehouse/item_stock";
import { checkAnonymousUser } from "../check_anonymous_user";

const service = useWarehouseService();

interface ItemStockDTO {
    itemId: string;
    goodQuantities: number;
    badQuantities: number;
    consignmentPrice: number;
    totalCostOfDepartures: number;
    status: string;
    total: number;
}

function toItemStockDTO(stock: ItemStock): ItemStockDTO {
    return {
        itemId: stock.itemId.toString(),
        goodQuantities: stock.goodQuantities,
        badQuantities: stock.badQuantities,
        consignmentPrice: stock.consignmentPrice,
        totalCostOfDepartures: stock.totalCostOfDepartures,
        total: stock.total,
        status: stock.status,
    };
}

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const itemsStock = await service.listItemStock();
    return itemsStock.map(toItemStockDTO);
});
