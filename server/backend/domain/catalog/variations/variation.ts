import { ID } from "../../../shared/id";

export class Variation {
    readonly variationId: ID;
    readonly name: string;
    #values: string[];

    constructor(variationId: ID, name: string, values: string[]) {
        this.variationId = variationId;
        this.name = name;
        this.#values = values;
    }

    get values() {
        return this.#values;
    }
}
