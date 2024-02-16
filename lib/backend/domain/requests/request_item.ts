import { Decimal } from "../../shared/decimal";
import { ItemCategory } from "../catalog/item";

type Options = {
    item: ItemCategory;
    quantity: number;
};

export class RequestItem {
    readonly item: ItemCategory;
    readonly quantity: number;
    #total: Decimal;

    private constructor(item: ItemCategory, quantity: number) {
        this.item = item;
        this.quantity = quantity;
        this.#total = Decimal.fromString("0");
    }

    static create(options: Options): RequestItem {
        const { item, quantity } = options;
        const requestItem = new RequestItem(item, quantity);
        requestItem.#calculateTotal();
        return requestItem;
    }

    #calculateTotal(): void {
        const factor = Decimal.fromString(this.quantity.toString());
        this.#total = this.item.price.multiply(factor);
    }

    getTotal(): Decimal {
        return this.#total;
    }
}
