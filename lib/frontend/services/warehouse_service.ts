import type { ItemStockModel } from "../models/item_stock";

const auth = useAuth();

export class WarehouseService {
    async updateItemStockStatus(itemId: string) {
        return await $fetch(`/api/warehouse/${itemId}`, {
            method: "patch",
            headers: this.headers,
        });
    }

    async listItemStock(): Promise<ItemStockModel[]> {
        return await $fetch("/api/warehouse/items-stock", {
            method: "get",
            headers: this.headers,
        });
    }

    get headers() {
        return {
            "X-Access-Token": auth.getToken(),
        };
    }
}
