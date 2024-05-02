import { makeServices } from "~/lib/backend/main";

const { dashboardService } = makeServices();

export default defineEventHandler(async (event) => {
    const result = await dashboardService.totalExpiredGoodsIssueNotes();

    setResponseStatus(event, 200);

    return {
        totalExpiredGoodsIssueNotes: result,
    };
});
