import { makeItemsDTO } from "../backend/application/item_dto";
import { makeItemService } from "../backend/main";

export default defineEventHandler(async (event) => {
    const { query } = getQuery(event);

    const itemService = makeItemService();

    const { result, pageToken, perPage, total } = await itemService.searchItems(query as string);

    const items = makeItemsDTO(result);

    return { items, pageToken, perPage, total };
});
