import { Variation } from "../../domain/catalog/variation";
import type { Either } from "../../shared/either";
import type { VariationNotFound } from "./variation_not_found_error";

export interface VariationRepository {
    findByNames(names: string[]): Promise<Either<VariationNotFound, Variation[]>>;
    save(variation: Variation): Promise<void>;
    getAll(): Promise<Variation[]>;
}
