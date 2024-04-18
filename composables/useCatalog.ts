import type { CategoryModel } from "~/lib/frontend/models/category";
import type { ItemModel } from "~/lib/frontend/models/item";
import type { SectionModel } from "~/lib/frontend/models/section";
import type { VariationModel } from "~/lib/frontend/models/variation";
import { CatalogService } from "~/lib/frontend/services/catalog_service";

const service = new CatalogService();

export function useCatalog() {
    const items = ref<ItemModel[]>([]);
    const variations = ref<VariationModel[]>([]);
    const categories = ref<CategoryModel[]>([]);
    const sections = ref<SectionModel[]>([]);

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

    const listSections = () => {
        service.listSections().then((res) => {
            sections.value = res;
        });
    };

    const filterVariations = (ids: string[]) => {
        return variations.value.filter((v) => ids.includes(v.variationId));
    };

    const findCategory = (id: string) => {
        return categories.value.find((c) => c.categoryId === id);
    };

    return {
        items,
        pages,
        categories,
        variations,
        sections,
        listItems,
        searchItems,
        listCategories,
        findCategory,
        listVariations,
        filterVariations,
        changePage,
        listSections,
    };
}
