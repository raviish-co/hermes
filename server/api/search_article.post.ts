import { makeRequestService } from "../backend/main";

export default defineEventHandler(async (event) => {
    const { query } = await readBody(event);
    const requestService = makeRequestService();
    return await requestService.searchArticles(query);
});
