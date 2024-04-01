import { Variation } from "~/lib/backend/domain/catalog/variations/variation";
import { makeServices } from "~/lib/backend/main";

const { catalogService } = makeServices();

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
