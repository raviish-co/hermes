const auth = useAuth();

export class ImportService {
    async importItems(formData: FormData) {
        return await $fetch("/api/items/upload", {
            method: "POST",
            headers: this.headers,
            body: formData,
        });
    }

    async importItemsStock(formData: FormData) {
        return await $fetch("/api/goods-receipt/upload", {
            method: "POST",
            headers: this.headers,
            body: formData,
        });
    }

    get headers() {
        return {
            "X-Access-Token": auth.getToken(),
            "Context-Type": "multipart/form-data",
        };
    }
}
