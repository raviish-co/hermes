import { ItemStock } from "./item_stock";

export interface ItemStockRepository {
    findAllOutOfStock(): Promise<ItemStock[]>;
}
