import type { ItemModel } from "~/lib/frontend/models/item";
import { CatalogService } from "~/lib/frontend/services/catalog_service";

const service = new CatalogService();

export function useCatalog() {
    const items = ref<ItemModel[]>([]);
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

    return { items, pages, searchItems, listItems, changePage };
}
