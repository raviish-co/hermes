import type { Result } from "../models/result";

export class UploadService {
    async upload(formData: FormData, category: Result, substring: Result) {
        return await $fetch("/api/upload_items", {
            method: "post",
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
}
