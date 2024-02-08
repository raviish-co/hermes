import { makeServices } from "../backend/main";

const { requestService } = makeServices();

export default defineEventHandler(async () => {
    return await requestService.listPurposes();
});
