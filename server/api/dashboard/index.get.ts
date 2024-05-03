import { makeServices } from "~/lib/backend/main";

const { dashboardService } = makeServices();

export default defineEventHandler(async (event) => {
    const totalExpiredGoodsIssueNotes = await dashboardService.totalExpiredGoodsIssueNotes();
    const totalOutOfStockItems = await dashboardService.totalOutOfStockItems();
    const totalInStockItems = await dashboardService.totalInStockItems();
    const totalInventoryValue = await dashboardService.totalInventoryValue();
    const percentageOfItemsInStock = await dashboardService.percentageOfItemsInStock();

    setResponseStatus(event, 200);

    return {
        totalInStockItems,
        totalExpiredGoodsIssueNotes,
        totalOutOfStockItems,
        totalInventoryValue: totalInventoryValue.value,
        percentageOfItemsInStock,
    };
});
