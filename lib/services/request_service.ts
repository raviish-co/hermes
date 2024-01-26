import type { Purpose } from "../models/purpose";

export class RequestService {
    async listPurposes(): Promise<Purpose[]> {
        return await $fetch("/api/list_purposes", { method: "get" });
    }
}
