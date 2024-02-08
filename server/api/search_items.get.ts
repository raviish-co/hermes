import { makeItemsDTO } from "../backend/application/item_dto";
import { makeServices } from "../backend/main";

const { catalogService } = makeServices();

export default defineEventHandler(async (event) => {
    const { query } = getQuery<{ query: string }>(event);

    const { result, pageToken, perPage, total } = await catalogService.searchItems(query);

    const items = makeItemsDTO(result);

    return { items, pageToken, perPage, total };
});
