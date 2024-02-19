import type { VariationRepository } from "@backend/domain/catalog/variation_repository";
import { Variation } from "@backend/domain/catalog/variation";

export class InmemVariationRepository implements VariationRepository {
    #variations: Record<string, Variation> = {};

    constructor(variations?: Variation[]) {
        if (variations) {
            variations.forEach((variation) => {
                this.#variations[variation.variationId.toString()] = variation;
            });
        }
    }

    save(variation: Variation): Promise<void> {
        this.#variations[variation.variationId.toString()] = variation;
        return Promise.resolve(undefined);
    }

    getAll(): Promise<Variation[]> {
        return Promise.resolve(this.records);
    }

    get records(): Variation[] {
        return Object.values(this.#variations);
    }
}
