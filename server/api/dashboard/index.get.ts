import { useDashboardService } from "@app/composables/useDashboardService";
import { checkAnonymousUser } from "../check_anonymous_user";
import { defineSafeEventHandler } from "~~/server/utils/handler";

const service = useDashboardService();

export default defineSafeEventHandler(async (event) => {
    checkAnonymousUser(event);

    const totalExpiredGoodsIssueNotes = await service.totalExpiredGoodsIssueNotes();
    const totalOutOfStockItems = await service.totalOutOfStockItems();
    const totalInStockItems = await service.totalInStockItems();
    const totalInventoryValue = await service.totalInventoryValue();
    const percentageOfItemsInStock = await service.percentageOfItemsInStock();

    setResponseStatus(event, 200);

    return {
        totalInStockItems,
        totalExpiredGoodsIssueNotes,
        totalOutOfStockItems,
        totalInventoryValue: totalInventoryValue.value,
        percentageOfItemsInStock,
    };
});
