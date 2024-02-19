import type { Pagination } from "../../shared/pagination";
import { ItemNotFound } from "./item_not_found_error";
import type { Either } from "../../shared/either";
import { ID } from "../../shared/id";
import { Item } from "./item";

export interface ItemCategoryRepository {
    findAll(queries: ID[]): Promise<Either<ItemNotFound, Item[]>>;
    getById(itemId: ID): Promise<Item>;
    list(pageToken: number, perPage: number): Promise<Pagination<Item>>;
    search(query: string, pageToken: number, perPage: number): Promise<Pagination<Item>>;
    updateAll(items: Item[]): Promise<void>;
    saveAll(items: Item[]): Promise<void>;
    last(): Promise<Item>;
}
