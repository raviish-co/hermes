import { ItemCategoryNotFound } from "@backend/domain/catalog/item_category_not_found_error";
import { ItemCategory } from "@backend/domain/catalog/item_category";
import type { Pagination } from "@backend/shared/pagination";
import type { ItemQuery } from "@backend/shared/types";
import type { Either } from "@backend/shared/either";
import { ID } from "@backend/shared/id";

export interface ItemCategoryRepository {
    getAll(queries: ItemQuery[]): Promise<Either<ItemCategoryNotFound, ItemCategory[]>>;
    getById(itemId: ID): Promise<ItemCategory>;
    list(pageToken: number, perPage: number): Promise<Pagination<ItemCategory>>;
    search(query: string, pageToken: number, perPage: number): Promise<Pagination<ItemCategory>>;
    updateAll(items: ItemCategory[]): Promise<void>;
    saveAll(items: ItemCategory[]): Promise<void>;
    last(): Promise<ItemCategory>;
}
