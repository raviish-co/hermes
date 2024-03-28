import { ID } from "../../shared/id";
import { type Condition, Status } from "../catalog/item";

export class GoodsReturnNoteLine {
    readonly returnLineId: ID;
    readonly itemId: ID;
    readonly name: string;
    readonly #quantity: number;
    readonly variationsValues?: Record<string, string>;
    condition: Condition;

    constructor(
        itemId: ID,
        name: string,
        quantity: number,
        variationsValues?: Record<string, string>,
        comment?: string
    ) {
        this.returnLineId = ID.random();
        this.itemId = itemId;
        this.name = name;
        this.#quantity = quantity;
        this.variationsValues = variationsValues;

        if (!comment) {
            this.condition = { status: Status.Good };
            return;
        }

        this.condition = { status: Status.Bad, comment };
    }

    get quantityReturned(): number {
        return this.#quantity;
    }
}
