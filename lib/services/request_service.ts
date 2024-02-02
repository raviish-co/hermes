import type { Purpose } from "../models/purpose";
import type { RequestItems } from "~/lib/models/request";

export class RequestService {
    async listPurposes(): Promise<Purpose[]> {
        return await $fetch("/api/purposes", { method: "get" });
    }

    async requestItems(request: RequestItems) {
        return await $fetch("/api/request", {
            method: "post",
            body: { request },
        });
    }
}
