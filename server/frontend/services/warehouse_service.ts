import { SuccessResponse } from "~~/shared/types/success_response";
import type { ItemStockModel } from "../models/item_stock";
import { useAuth } from "@app/composables/useAuth";
import { Either, left, right } from "~~/server/backend/shared/either";

const auth = useAuth();

export class WarehouseService {
    async markItemInStockAsIntern(itemId: string): Promise<Either<Error, SuccessResponse>> {
        try {
            const res = await $fetch<SuccessResponse>(`/api/warehouse/${itemId}`, {
                method: "patch",
                headers: await this.#headers(),
            });
            return right(res);
        } catch (error: any) {
            console.error("Erro ao marcar o artigo como interno:", error);

            const message =
                error.data?.message ||
                "Erro desconhecido ao marcar o artigo como interno. Tente novamente mais tarde.";

            return left(new Error(message));
        }
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
