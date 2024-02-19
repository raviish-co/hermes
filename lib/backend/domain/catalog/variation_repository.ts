import { Variation } from "@backend/domain/catalog/variation";

export interface VariationRepository {
    save(variation: Variation): Promise<void>;
    getAll(): Promise<Variation[]>;
}
