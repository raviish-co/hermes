import { makeItemsDTO } from "../backend/application/item_dto";
import { makeServices } from "../backend/main";
export interface Pagination {
    pageToken?: number;
    perPage?: number;
}

const { catalogService } = makeServices();

export default defineEventHandler(async (event) => {
    const query = getQuery<Pagination>(event);

    const pageToken = Number(query.pageToken);
    const perPage = Number(query.perPage);

    const { result, total } = await catalogService.listItems(pageToken, perPage);

    const items = makeItemsDTO(result);

    return { items, total };
});
