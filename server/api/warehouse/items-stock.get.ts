import { useWarehouseService } from "@app/composables/useWarehouseService";
import { ItemStock } from "@backend/domain/warehouse/item_stock";
import { checkAnonymousUser } from "../check_anonymous_user";

const service = useWarehouseService();

interface ItemStockDTO {
    itemId: string;
    goodQuantities: number;
    badQuantities: number;
    consignmentValue: number;
    totalValueOfOutputs: number;
    itemStockType: string;
    total: number;
}

function toItemStockDTO(stock: ItemStock): ItemStockDTO {
    return {
        itemId: stock.itemId.toString(),
        goodQuantities: stock.goodQuantities,
        badQuantities: stock.badQuantities,
        consignmentValue: stock.consignmentValue,
        totalValueOfOutputs: stock.totalValueOfOutputs,
        itemStockType: stock.itemStockType,
        total: stock.total,
    };
}

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const itemsStock = await service.listItemStock();
    return itemsStock.map(toItemStockDTO);
});
