import type { ItemStockModel } from "../models/item_stock";

const auth = useAuth();

export class WarehouseService {
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
