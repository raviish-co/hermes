import { makeServices } from "@backend/main";
import { toItemDTO } from "./item_dto";

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

    const items = result.map(toItemDTO);

    return { items, total };
});
