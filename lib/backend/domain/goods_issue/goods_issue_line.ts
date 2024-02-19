import { Item } from "../catalog/item";
import { Decimal } from "../../shared/decimal";

type Options = {
    item: Item;
    quantity: number;
};

export class GoodsIssueLine {
    readonly item: Item;
    readonly quantity: number;
    #netTotal: Decimal;

    private constructor(item: Item, quantity: number) {
        this.item = item;
        this.quantity = quantity;
        this.#netTotal = Decimal.fromString("0");
    }

    static create(options: Options): GoodsIssueLine {
        const { item, quantity } = options;
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
