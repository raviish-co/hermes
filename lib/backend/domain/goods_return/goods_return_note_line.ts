import { ID } from "../../shared/id";
import { Condition } from "../../shared/condition";

export class GoodsReturnNoteLine {
    readonly lineId: ID;
    readonly itemId: ID;
    readonly description: string;
    readonly variationsValues?: Record<string, string>;
    readonly #goodQuantities: number;
    readonly #badQuantities: number;
    condition: Condition;

    constructor(
        itemId: ID,
        description: string,
        goodQuantities: number,
        badQuantities?: number,
        variationsValues?: Record<string, string>,
        comment?: string
    ) {
        this.lineId = ID.random();
        this.itemId = itemId;
        this.description = description;
        this.variationsValues = variationsValues;
        this.#goodQuantities = goodQuantities;
        this.#badQuantities = badQuantities ?? 0;
        this.condition = new Condition(comment);
    }

    get goodQuantities(): number {
        return this.#goodQuantities;
    }

    get badQuantities(): number {
        return this.#badQuantities;
    }

    get total(): number {
        return this.#goodQuantities + this.#badQuantities;
    }
}
