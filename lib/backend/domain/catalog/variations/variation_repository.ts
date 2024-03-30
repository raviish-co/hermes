import type { VariationNotFound } from "./variation_not_found_error";
import type { Either } from "../../../shared/either";
import { Variation } from "../variations/variation";

export interface VariationRepository {
    findByNames(names: string[]): Promise<Either<VariationNotFound, Variation[]>>;
    save(variation: Variation): Promise<void>;
    getAll(): Promise<Variation[]>;
}
