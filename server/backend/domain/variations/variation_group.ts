import { Variation } from "./variation";

export class VariationGroup {
    readonly variations: Variation[];

    constructor(variations: Variation[]) {
        this.variations = variations;
    }
}
