import { ID } from "../../shared/id";

export class GoodsReceiptLine {
    readonly itemId: ID;
    readonly quantity: number;

    constructor(itemId: ID, quantity: number) {
        this.itemId = itemId;
        this.quantity = quantity;
    }
}
