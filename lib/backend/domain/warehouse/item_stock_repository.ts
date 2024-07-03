import type { ID } from "../../shared/id";
import { ItemStock } from "./item_stock";

export interface ItemStockRepository {
    getAll(): Promise<ItemStock[]>;
    save(itemStock: ItemStock): Promise<void>;
    saveAll(itemStocks: ItemStock[]): Promise<void>;
    updateAll(itemStocks: ItemStock[]): Promise<void>;
    findAll(itemIds: ID[]): Promise<ItemStock[]>;
    findAllInStock(): Promise<ItemStock[]>;
    findAllOutOfStock(): Promise<ItemStock[]>;
}
