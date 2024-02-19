import { ItemCategoryNotFound } from "../../domain/catalog/item_category_not_found_error";
import { ItemCategory } from "../../domain/catalog/item_category";
import type { Pagination } from "../../shared/pagination";
import type { ItemQuery } from "../../shared/types";
import type { Either } from "../../shared/either";
import { ID } from "../../shared/id";

export interface ItemCategoryRepository {
    getAll(queries: ItemQuery[]): Promise<Either<ItemCategoryNotFound, ItemCategory[]>>;
    getById(itemId: ID): Promise<ItemCategory>;
    list(pageToken: number, perPage: number): Promise<Pagination<ItemCategory>>;
    search(query: string, pageToken: number, perPage: number): Promise<Pagination<ItemCategory>>;
    updateAll(items: ItemCategory[]): Promise<void>;
    saveAll(items: ItemCategory[]): Promise<void>;
    last(): Promise<ItemCategory>;
}
