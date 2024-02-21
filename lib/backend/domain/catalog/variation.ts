import { ID } from "../../shared/id";

export class Variation {
    readonly variationId: ID;
    #name: string;
    #values: string[];

    constructor(variationId: ID, name: string, values: string[]) {
        this.variationId = variationId;
        this.#name = name;
        this.#values = values;
    }
}
