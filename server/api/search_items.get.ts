import { makeItemsDTO } from "../backend/application/item_dto";
import { makeServices } from "../backend/main";

const { catalogService } = makeServices();

export default defineEventHandler(async (event) => {
    const { query, pageToken, perPage } = getQuery<{
        query: string;
        pageToken?: string;
        perPage?: string;
    }>(event);

    const { result, total } = await catalogService.searchItems(
        query,
        Number(pageToken),
        Number(perPage)
    );

    const items = makeItemsDTO(result);

    return { items, total };
});
