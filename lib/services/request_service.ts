import type { Purpose } from "~/lib/models/purpose";

export class RequestService {
    async listPurposes(): Promise<Purpose[]> {
        return await $fetch("/api/purposes", { method: "get" });
    }
}
