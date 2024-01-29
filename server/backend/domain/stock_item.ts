import { ID } from "../shared/id";

export class StockItem {
    readonly itemId: ID;
    readonly quantity: number;

    constructor(itemId: ID, quantity: number) {
        this.itemId = itemId;
        this.quantity = quantity;
    }

    verifyStock(quantity: number): boolean {
        return this.quantity < quantity;
    }
}
