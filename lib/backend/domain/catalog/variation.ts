import { ID } from "@backend/shared/id";

export class Variation {
    readonly variationId: ID;
    readonly name: string;
    readonly values: string[];

    constructor(variationId: ID, name: string, values: string[]) {
        this.variationId = variationId;
        this.name = name;
        this.values = values;
    }

    getFullTextName(): string {
        return this.name + ": ";
    }
}
