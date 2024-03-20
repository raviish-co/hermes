import type { Condition } from "../models/condition";
import type { VariationValue } from "../models/variation_value";
import { NoteLine } from "./note_line";

export class GoodsReceiptNoteLine extends NoteLine {
    constructor(
        itemId: string,
        name: string,
        quantity: number,
        variationsValues?: VariationValue[],
        condition?: Condition
    ) {
        super(itemId, name, quantity, 0, variationsValues, condition);
    }
}
