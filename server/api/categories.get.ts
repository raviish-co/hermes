import { makeServices } from "../backend/main";

const { catalogService } = makeServices();

export default defineEventHandler(async () => {
    const categories = await catalogService.getCategories();

    return categories;
});
