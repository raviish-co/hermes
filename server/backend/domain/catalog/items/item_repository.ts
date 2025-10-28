import type { Either } from "../../../shared/either";
import { ID } from "../../../shared/id";
import type { Pagination, PaginatorOptions } from "../../../shared/pagination";
import { Item } from "./item";
import { ItemNotFound } from "./item_not_found_error";

export interface ItemRepository {
    getAll(opts?: PaginatorOptions): Promise<Pagination<Item>>;
    findAll(itemsIds: ID[]): Promise<Either<ItemNotFound, Item[]>>;
    getById(itemId: ID): Promise<Either<ItemNotFound, Item>>;
    search(query: string, opts: PaginatorOptions): Promise<Pagination<Item>>;
    update(item: Item): Promise<void>;
    save(item: Item): Promise<void>;
    saveAll(items: Item[]): Promise<void>;
    last(): Promise<Item>;
}
