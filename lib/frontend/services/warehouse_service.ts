import type { ItemStockModel } from "../models/item_stock";

const auth = useAuth();

export class WarehouseService {
    async markItemInStockAsIntern(itemId: string) {
        return await $fetch(`/api/warehouse/${itemId}`, {
            method: "patch",
            headers: await this.#headers(),
        });
    }

    async listItemStock(): Promise<ItemStockModel[]> {
        return await $fetch("/api/warehouse/items-stock", {
            method: "get",
            headers: await this.#headers(),
        });
    }

    async #headers() {
        return {
            "X-Access-Token": await auth.getAccessToken(),
        };
    }
}
