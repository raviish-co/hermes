import { makeItemsDTO } from "../backend/application/item_dto";
import { makeServices } from "../backend/main";

const { catalogService } = makeServices();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const page = Number(query.pageToken);

    const { result, pageToken, perPage, total } = await catalogService.listItems(page);

    const items = makeItemsDTO(result);

    return { items, pageToken, perPage, total };
});
