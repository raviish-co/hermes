import { handleException } from "~/lib/helpers/error_handler";
import type { VariationModel } from "~/lib/models/variation";
import { CatalogService } from "~/lib/services/catalog_service";

export default () => {
    const catalogService = new CatalogService();

    const variations = ref<VariationModel[]>([]);

    async function refresh() {
        const variationsOrVoid = await catalogService.listVariations().catch(handleException);

        variations.value = variationsOrVoid || [];
    }

    return { refresh, variations: useState("variations", () => variations) };
};
