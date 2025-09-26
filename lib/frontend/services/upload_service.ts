const auth = useAuth();

export class ImportService {
    async importItems(formData: FormData) {
        return await $fetch("/api/items/upload", {
            method: "POST",
            headers: await this.#headers(),
            body: formData,
        });
    }

    async importItemsStock(formData: FormData) {
        return await $fetch("/api/goods-receipt/upload", {
            method: "POST",
            headers: await this.#headers(),
            body: formData,
        });
    }

    async #headers() {
        return {
            "X-Access-Token": await auth.getAccessToken(),
            "Context-Type": "multipart/form-data",
        };
    }
}
