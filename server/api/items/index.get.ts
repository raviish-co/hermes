import { useCatalogService } from "@app/composables/useCatalogService";
import { checkAnonymousUser } from "../check_anonymous_user";
import { toItemDTO } from "./item_dto";

const service = useCatalogService();

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const query = getQuery(event);
    const pageToken = Number(query.pageToken);
    const perPage = Number(query.perPage);

    const { result, total } = await service.listItems(pageToken, perPage);

    const items = result.map(toItemDTO);

    return { items, total };
});
