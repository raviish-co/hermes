import { ItemCategory } from "@backend/domain/catalog/item_category";
import { Decimal } from "@backend/shared/decimal";

type Options = {
    item: ItemCategory;
    quantity: number;
};

export class GoodsIssueLine {
    readonly item: ItemCategory;
    readonly quantity: number;
    #netTotal: Decimal;

    private constructor(item: ItemCategory, quantity: number) {
        this.item = item;
        this.quantity = quantity;
        this.#netTotal = Decimal.fromString("0");
    }

    static create(options: Options): GoodsIssueLine {
        const { item, quantity } = options;
        const requestItem = new GoodsIssueLine(item, quantity);
        requestItem.#calculateTotal();
        return requestItem;
    }

    #calculateTotal(): void {
        const factor = Decimal.fromString(this.quantity.toString());
        this.#netTotal = this.item.price.multiply(factor);
    }

    getTotal(): Decimal {
        return this.#netTotal;
    }
}