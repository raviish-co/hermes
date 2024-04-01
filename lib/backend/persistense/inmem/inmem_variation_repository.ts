import type { VariationRepository } from "../../domain/catalog/variations/variation_repository";
import { VariationNotFound } from "../../domain/catalog/variations/variation_not_found_error";
import { Variation } from "../../domain/catalog/variations/variation";
import { left, right, type Either } from "../../shared/either";
import type { ID } from "../../shared/id";

export class InmemVariationRepository implements VariationRepository {
    #variations: Record<string, Variation> = {};

    constructor(variations?: Variation[]) {
        if (variations) {
            variations.forEach((variation) => {
                this.#variations[variation.variationId.toString()] = variation;
            });
        }
    }

    findByNames(names: string[]): Promise<Either<VariationNotFound, Variation[]>> {
        const variations = [];
        for (const name of names) {
            const variation = this.records.find((v) => v.name === name);
            if (!variation) return Promise.resolve(left(new VariationNotFound(name)));
            variations.push(variation);
        }
        return Promise.resolve(right(variations));
    }

    vertifyIds(variationsIds: ID[]): Promise<Either<VariationNotFound, void>> {
        for (const variationId of variationsIds) {
            const variation = this.records.find((v) => v.variationId.equals(variationId));
            if (!variation)
                return Promise.resolve(left(new VariationNotFound(variationId.toString())));
        }
        return Promise.resolve(right(undefined));
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
