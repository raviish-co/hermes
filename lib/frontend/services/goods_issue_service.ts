import type { GoodsIssueModel } from "@frontend/models/goods_issue";

export class GoodsIssueService {
    async new(request: GoodsIssueModel) {
        return await $fetch("/api/goods-issue", {
            method: "post",
            body: { request },
        });
    }
}