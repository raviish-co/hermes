import type { VariationModel } from "@frontend/models/variation";
import { CatalogService } from "@frontend/services/catalog_service";

export default () => {
    const catalogService = new CatalogService();

    const variations = ref<VariationModel[]>([]);

    async function refresh() {
        variations.value = await catalogService.listVariations();
    }

    return { refresh, variations: useState("variations", () => variations.value) };
};
