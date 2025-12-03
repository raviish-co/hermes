import { useCatalogService } from "@app/composables/useCatalogService";
import { Variation } from "@backend/domain/catalog/variations/variation";
import { checkAnonymousUser } from "../check_anonymous_user";
const service = useCatalogService();

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

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const variations = await service.listVariations();
    return variations.map(toVariationDTO);
});
