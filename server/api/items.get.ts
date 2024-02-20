import { makeServices } from "@backend/main";
import { toItemDTO } from "./item_dto";

const { catalogService } = makeServices();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const pageToken = Number(query.pageToken);
    const perPage = Number(query.perPage);

    const { result, total } = await catalogService.listItems(pageToken, perPage);

    const items = result.map(toItemDTO);

    return { items, total };
});
