import type { GoodsIssueModel } from "@frontend/models/goods_issue";

export class RequestService {
    async requestArticles(request: GoodsIssueModel) {
        return await $fetch("/api/request", {
            method: "post",
            body: { request },
        });
    }
}
