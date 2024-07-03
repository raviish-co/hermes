import { useCatalogService } from "~/composables/useCatalogService";
import { toItemDTO } from "./item_dto";

const service = useCatalogService();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const pageToken = Number(query.pageToken);
    const perPage = Number(query.perPage);

    const { result, total } = await service.listItems(pageToken, perPage);

    const items = result.map(toItemDTO);

    return { items, total };
});
