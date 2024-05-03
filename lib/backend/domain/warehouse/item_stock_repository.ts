import { ItemStock } from "./item_stock";

export interface ItemStockRepository {
    findAllInStock(): Promise<ItemStock[]>;
    findAllOutOfStock(): Promise<ItemStock[]>;
}
