import { Decimal } from "../../shared/decimal";
import { Item } from "../catalog/item";

export class GoodsIssueLine {
    readonly item: Item;
    readonly quantity: number;
    #netTotal: Decimal;

    private constructor(item: Item, quantity: number) {
        this.item = item;
        this.quantity = quantity;
        this.#netTotal = Decimal.fromString("0");
    }

    static create(item: Item, quantity: number): GoodsIssueLine {
        const goodsIssueLine = new GoodsIssueLine(item, quantity);
        goodsIssueLine.#calculateTotal();
        return goodsIssueLine;
    }

    #calculateTotal(): void {
        const factor = Decimal.fromString(this.quantity.toString());
        this.#netTotal = this.item.price.multiply(factor);
    }

    getTotal(): Decimal {
        return this.#netTotal;
    }
}
