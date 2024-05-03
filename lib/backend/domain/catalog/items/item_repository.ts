import type { Pagination } from "../../../shared/pagination";
import { ItemNotFound } from "./item_not_found_error";
import type { Either } from "../../../shared/either";
import { ID } from "../../../shared/id";
import { Item } from "./item";

export interface ItemRepository {
    getAll(): Promise<Item[]>;
    findAll(itemsIds: ID[]): Promise<Either<ItemNotFound, Item[]>>;
    getById(itemId: ID): Promise<Either<ItemNotFound, Item>>;
    list(pageToken: number, perPage: number): Promise<Pagination<Item>>;
    search(query: string, pageToken: number, perPage: number): Promise<Pagination<Item>>;
    updateAll(items: Item[]): Promise<void>;
    update(item: Item): Promise<void>;
    save(item: Item): Promise<void>;
    saveAll(items: Item[]): Promise<void>;
    last(): Promise<Item>;
}
