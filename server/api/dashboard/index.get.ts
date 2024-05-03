import { makeServices } from "~/lib/backend/main";

const { dashboardService } = makeServices();

export default defineEventHandler(async (event) => {
    const totalExpiredGoodsIssueNotes = await dashboardService.totalExpiredGoodsIssueNotes();
    const totalOutOfStockItems = await dashboardService.totalOutOfStockItems();

    setResponseStatus(event, 200);

    return {
        totalExpiredGoodsIssueNotes,
        totalOutOfStockItems,
    };
});
