import { useCatalogService } from "~/composables/useCatalogService";
import { Variation } from "~/lib/backend/domain/catalog/variations/variation";

const catalogService = useCatalogService();

interface VariationDTO {
    variationId: string;
    name: string;
    values: string[];
}

function toVariationDTO(v: Variation): VariationDTO {
    return {
        variationId: v.variationId.toString(),
        name: v.name,
        values: v.values,
    };
}

export default defineEventHandler(async () => {
    const variations = await catalogService.listVariations();
    return variations.map(toVariationDTO);
});
