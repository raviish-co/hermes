import type { ID } from "~~/server/backend/shared/id";
import type { Either } from "../../../shared/either";
import { Variation } from "./variation";
import type { VariationNotFound } from "./variation_not_found_error";

export interface VariationRepository {
    findByNames(names: string[]): Promise<Either<VariationNotFound, Variation[]>>;
    vertifyIds(variationsIds: ID[]): Promise<Either<VariationNotFound, void>>;
    verifyValues(values: string[]): Promise<Either<VariationNotFound, void>>;
    save(variation: Variation): Promise<void>;
    getAll(): Promise<Variation[]>;
}
