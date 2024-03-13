import { ID } from "../../shared/id";

export class GoodsReturnLine {
    readonly returnLineId: ID;
    readonly itemId: ID;
    readonly #quantity: number;

    constructor(itemId: ID, quantity: number) {
        this.itemId = itemId;
        this.returnLineId = ID.random();
        this.#quantity = quantity;
    }

    get quantityReturned(): number {
        return this.#quantity;
    }
}
