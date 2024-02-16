import type { Purpose } from "../models/purpose";
import type { RequestModel } from "~/lib/models/request";

export class RequestService {
    async listPurposes(): Promise<Purpose[]> {
        return await $fetch("/api/purposes", { method: "get" });
    }

    async requestItems(request: RequestModel) {
        return await $fetch("/api/request", {
            method: "post",
            body: { request },
        });
    }
}
