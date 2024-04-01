import type { VariationNotFound } from "./variation_not_found_error";
import type { Either } from "../../../shared/either";
import { Variation } from "../variations/variation";
import type { ID } from "~/lib/backend/shared/id";

export interface VariationRepository {
    findByNames(names: string[]): Promise<Either<VariationNotFound, Variation[]>>;
    vertifyIds(variationsIds: ID[]): Promise<Either<VariationNotFound, void>>;
    save(variation: Variation): Promise<void>;
    getAll(): Promise<Variation[]>;
}
