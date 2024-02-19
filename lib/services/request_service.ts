import type { GoodsIssueModel } from "../models/goods_issue";
import type { PurposeModel } from "../models/purpose";

export class RequestService {
    async listPurposes(): Promise<PurposeModel[]> {
        return await $fetch("/api/purposes", { method: "get" });
    }

    async requestArticles(request: GoodsIssueModel) {
        return await $fetch("/api/request", {
            method: "post",
            body: { request },
        });
    }
}
