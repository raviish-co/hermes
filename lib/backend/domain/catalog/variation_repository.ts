import { Variation } from "@backend/domain/catalog/variation";

export interface VariationRepository {
    save(variation: Variation): Promise<void>;
    getVariations(): Promise<Variation[]>;
}
