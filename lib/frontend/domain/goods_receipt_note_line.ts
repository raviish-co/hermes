import type { ConditionModel } from "../models/condition";
import type { VariationValueModel } from "../models/variation_value";
import { NoteLine } from "./note_line";

export class GoodsReceiptNoteLine extends NoteLine {
    constructor(
        itemId: string,
        name: string,
        quantity: number,
        variationsValues?: VariationValueModel[],
        condition?: ConditionModel
    ) {
        super(itemId, name, quantity, 0, variationsValues, condition);
    }
}
