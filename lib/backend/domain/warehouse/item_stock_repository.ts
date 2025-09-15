import type { Either } from "../../shared/either";
import type { ID } from "../../shared/id";
import { ItemStock } from "./item_stock";
import type { ItemStockNotFound } from "./item_stock_not_found";

export interface ItemStockRepository {
    getAll(): Promise<ItemStock[]>;
    getById(itemId: ID): Promise<Either<ItemStockNotFound, ItemStock>>;
    save(itemStock: ItemStock): Promise<void>;
    saveAll(itemStocks: ItemStock[]): Promise<void>;
    findAll(itemIds: ID[]): Promise<ItemStock[]>;
    findAllInStock(): Promise<ItemStock[]>;
    findAllOutOfStock(): Promise<ItemStock[]>;
}
