import { ItemStock } from "./item_stock";

export interface ItemStockRepository {
    save(itemStock: ItemStock): Promise<void>;
    findAllInStock(): Promise<ItemStock[]>;
    findAllOutOfStock(): Promise<ItemStock[]>;
}
