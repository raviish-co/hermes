import { ItemModel } from "~/lib/frontend/models/item";
import { Item } from "@backend/domain/catalog/item_category";
import { makeServices } from "@backend/main";

export interface Pagination {
    pageToken?: number;
    perPage?: number;
}

export type ConditionStatus = "Bom" | "Mau";

const { catalogService } = makeServices();

function toItemCategoryDTO(item: Item): ItemModel {
    return {
        itemId: item.itemId.toString(),
        name: item.name,
        price: item.price.value,
        categoryId: item.categoryId.toString(),
        variationsValues: [],
        isUnique: item.isUnique(),
        quantity: item.getStock().getQuantity(),
        condition: {
            status: item.getCondition().status as ConditionStatus,
            comment: item.getCondition()?.comment,
        },
    };
}

export default defineEventHandler(async (event) => {
    const query = getQuery<Pagination>(event);

    const pageToken = Number(query.pageToken);
    const perPage = Number(query.perPage);

    const { result, total } = await catalogService.listItems(pageToken, perPage);

    const items = result.map(toItemCategoryDTO);

    return { items, total };
});
