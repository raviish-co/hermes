import { makeRequestService } from "../backend/main";

export default defineEventHandler(async () => {
    const requestService = makeRequestService();
    return await requestService.listPurposes();
});
