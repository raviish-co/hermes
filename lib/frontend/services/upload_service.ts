export class ImportService {
    async importItems(formData: FormData) {
        return await $fetch("/api/items/upload", {
            method: "POST",
            headers: useRequestHeaders(["Content-Type", "multipart/form-data"]),
            body: formData,
        });
    }

    async importItemsStock(formData: FormData) {
        return await $fetch("/api/goods-receipt/upload", {
            method: "POST",
            headers: useRequestHeaders(["Content-Type", "multipart/form-data"]),
            body: formData,
        });
    }
}
