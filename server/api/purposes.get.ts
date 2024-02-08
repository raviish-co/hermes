import { makeServices } from "../backend/main";

export default defineEventHandler(async () => {
    const articleService = makeServices();
    return await articleService.listPurposes();
});
