export class UploadService {
    async upload(formData: FormData) {
        return await $fetch("/api/items/upload", {
            method: "POST",
            headers: useRequestHeaders(["Content-Type", "multipart/form-data"]),
            body: formData,
        });
    }
}
