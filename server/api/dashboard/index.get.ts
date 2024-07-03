import { useDashboardService } from "~/composables/useDashboardService";

const service = useDashboardService();

export default defineEventHandler(async (event) => {
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
