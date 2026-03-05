import { useAuth } from "@/composables/useAuth";
import { Either, left, right } from "~~/server/backend/shared/either";
import { SuccessResponse } from "~~/shared/types/success_response";

const auth = useAuth();

export class ImportService {
    async importItems(formData: FormData): Promise<Either<Error, SuccessResponse>> {
        try {
            const response = await $fetch("/api/items/upload", {
                method: "POST",
                headers: await this.#headers(),
                body: formData,
            });
            return right(response);
        } catch (error: any) {
            console.error("Erro ao importar itens:", error);

            const message = error.data?.message ?? "Erro ao importar itens. Tente novamente.";

            return left(new Error(message));
        }
    }

    async importItemsStock(formData: FormData): Promise<Either<Error, SuccessResponse>> {
        try {
            const response = await $fetch("/api/goods-receipt/upload", {
                method: "POST",
                headers: await this.#headers(),
                body: formData,
            });
            return right(response);
        } catch (error: any) {
            console.error("Erro ao importar itens:", error);

            const message = error.data?.message ?? "Erro ao importar itens. Tente novamente.";

            return left(new Error(message));
        }
    }

    async #headers() {
        return {
            "X-Access-Token": await auth.getAccessToken(),
            "Context-Type": "multipart/form-data",
        };
    }
}
