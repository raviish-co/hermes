import { ItemNotFound } from "./item_not_found_error";
import { Pagination } from "../../shared/pagination";
import { ItemQuery } from "../../shared/types";
import { Either } from "../../shared/either";
import { ItemCategory } from "./item";
import { ID } from "../../shared/id";

export interface ItemRepository {
    getAll(queries: ItemQuery[]): Promise<Either<ItemNotFound, ItemCategory[]>>;
    getById(itemId: ID): Promise<ItemCategory>;
    list(pageToken: number, perPage: number): Promise<Pagination<ItemCategory>>;
    search(query: string, pageToken: number, perPage: number): Promise<Pagination<ItemCategory>>;
    updateAll(items: ItemCategory[]): Promise<void>;
    saveAll(items: ItemCategory[]): Promise<void>;
    last(): Promise<ItemCategory>;
}
