import { Variation } from "@backend/domain/catalog/variation";
import { makeServices } from "@backend/main";

const { catalogService } = makeServices();

interface VariationDTO {
    id: string;
    name: string;
    values: string[];
}

function toVariationDTO(v: Variation): VariationDTO {
    return {
        id: v.variationId.toString(),
        name: v.name,
        values: v.values,
    };
}

export default defineEventHandler(async () => {
    return (await catalogService.getVariations()).map(toVariationDTO);
});
