export class UploadService {
    async upload(formData: FormData) {
        return await $fetch("/api/upload-items", {
            method: "POST",
            headers: useRequestHeaders(["Content-Type", "multipart/form-data"]),
            body: formData,
        });
    }
}
