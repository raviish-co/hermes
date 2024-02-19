import { handleException } from "@frontend/helpers/error_handler";
import type { VariationModel } from "@frontend/models/variation";
import { CatalogService } from "@frontend/services/catalog_service";

export default () => {
    const catalogService = new CatalogService();

    const variations = ref<VariationModel[]>([]);

    async function refresh() {
        const variationsOrVoid = await catalogService.listVariations().catch(handleException);

        variations.value = variationsOrVoid || [];
    }

    return { refresh, variations: useState("variations", () => variations) };
};
