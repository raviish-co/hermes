import { VariationRepository } from "../../application/catalog_service";
import { Variation } from "../../domain/catalog/variation";

export class InmemVariationRepository implements VariationRepository {
    constructor(variations?: Variation[]) {
        if (variations) {
            variations.forEach((variation) => {
                this.#variations[variation.variationId.toString()] = variation;
            });
        }
    }

    #variations: Record<string, Variation> = {};

    save(variation: Variation): Promise<void> {
        this.#variations[variation.variationId.toString()] = variation;
        return Promise.resolve(undefined);
    }

    getVariations(): Promise<Variation[]> {
        return Promise.resolve(this.records);
    }

    get records(): Variation[] {
        return Object.values(this.#variations);
    }
}
