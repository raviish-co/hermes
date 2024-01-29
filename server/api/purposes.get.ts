import { makeRequestService } from "../backend/main";

export default defineEventHandler(async () => {
    const articleService = makeRequestService();
    return await articleService.listPurposes();
});
