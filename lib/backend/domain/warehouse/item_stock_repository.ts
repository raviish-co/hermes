import type { Either } from "../../shared/either";
import type { ID } from "../../shared/id";
import type { ItemNotFound } from "../catalog/items/item_not_found_error";
import { ItemStock } from "./item_stock";
import type { ItemStockNotFound } from "./item_stock_not_found";

export interface ItemStockRepository {
    getAll(): Promise<ItemStock[]>;
    save(itemStock: ItemStock): Promise<void>;
    updateAll(itemStocks: ItemStock[]): Promise<void>;
    findAll(itemIds: ID[]): Promise<Either<ItemStockNotFound, ItemStock[]>>;
    findAllInStock(): Promise<ItemStock[]>;
    findAllOutOfStock(): Promise<ItemStock[]>;
}
