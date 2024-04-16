import type { CategoryModel } from "~/lib/frontend/models/category";
import type { ItemModel } from "~/lib/frontend/models/item";
import type { VariationModel } from "~/lib/frontend/models/variation";
import { CatalogService } from "~/lib/frontend/services/catalog_service";

const service = new CatalogService();

export function useCatalog() {
    const items = ref<ItemModel[]>([]);
    const variations = ref<VariationModel[]>([]);
    const categories = ref<CategoryModel[]>([]);

    const pages = ref<number>(1);

    const changePage = (page: number) => {
        service.listItems(page).then((res) => {
            items.value = res.items;
            pages.value = res.total;
        });
    };

    const searchItems = (text: string) => {
        if (text.length < 3) {
            listItems();
            return;
        }

        service.searchItems(text).then((res) => {
            items.value = res.items;
            pages.value = res.total;
        });
    };

    const listItems = (page: number = 1) => {
        service.listItems(page).then((res) => {
            items.value = res.items;
            pages.value = res.total;
        });
    };

    const listVariations = () => {
        service.listVariations().then((res) => {
            variations.value = res;
        });
    };

    const listCategories = () => {
        service.listCategories().then((res) => {
            categories.value = res;
        });
    };

    const filterVariations = (ids: string[]) => {
        return variations.value.filter((v) => ids.includes(v.variationId));
    };

    return {
        items,
        pages,
        categories,
        searchItems,
        listItems,
        listCategories,
        listVariations,
        filterVariations,
        changePage,
    };
}
