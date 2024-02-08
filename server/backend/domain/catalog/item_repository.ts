import { ProductNotFound } from "./product_not_found_error";
import { Pagination } from "../../shared/pagination";
import { ItemQuery } from "../../shared/types";
import { Either } from "../../shared/either";
import { Item } from "./item";
import { ID } from "../../shared/id";

export interface ItemRepository {
    getAll(products: ItemQuery[]): Promise<Either<ProductNotFound, Item[]>>;
    getById(itemId: ID): Promise<Item>;
    list(pageToken: number, perPage: number): Promise<Pagination<Item>>;
    search(query: string, pageToken: number, perPage: number): Promise<Pagination<Item>>;
    updateAll(items: Item[]): Promise<void>;
    saveAll(items: Item[]): Promise<void>;
    last(): Promise<Item>;
}
