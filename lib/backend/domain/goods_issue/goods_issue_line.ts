import { Decimal } from "../../shared/decimal";
import type { Item } from "../catalog/item";

export class GoodsIssueLine {
    readonly item: Item;
    readonly quantity: number;
    #netTotal: Decimal;

    constructor(item: Item, quantity: number) {
        this.item = item;
        this.quantity = quantity;
        this.#netTotal = Decimal.fromString("0");
        this.#calculateTotal();
    }

    #calculateTotal(): void {
        const factor = Decimal.fromString(this.quantity.toString());
        this.#netTotal = this.item.price.multiply(factor);
    }

    restoreStockQuantity(quantity?: number): void {
        if (!quantity) {
            this.item.updateStock(this.quantity);
            return;
        }

        this.item.updateStock(quantity);
    }

    get total(): Decimal {
        return this.#netTotal;
    }
}
