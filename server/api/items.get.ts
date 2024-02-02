import { makeItemsDTO } from "../backend/application/item_dto";
import { makeItemService } from "../backend/main";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const page = Number(query.pageToken);

    const articleService = makeItemService();

    const { result, pageToken, perPage, total } = await articleService.listItems(page);

    const items = makeItemsDTO(result);

    return { items, pageToken, perPage, total };
});
