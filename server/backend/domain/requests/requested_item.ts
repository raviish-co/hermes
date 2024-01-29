import { Decimal } from "../../shared/decimal";
import { Item } from "../products/item";

type Options = {
    item: Item;
    quantity: number;
};

export class RequestedItem {
    readonly item: Item;
    readonly quantity: number;
    #total: Decimal;

    private constructor(item: Item, quantity: number) {
        this.item = item;
        this.quantity = quantity;
        this.#total = Decimal.fromString("0");
    }

    static create(options: Options): RequestedItem {
        const { item, quantity } = options;
        const requestedItem = new RequestedItem(item, quantity);
        requestedItem.#calculateTotal();
        return requestedItem;
    }

    #calculateTotal(): void {
        const factor = Decimal.fromString(this.quantity.toString());
        this.#total = this.item.product.price.multiply(factor);
    }

    getTotal(): Decimal {
        return this.#total;
    }
}
