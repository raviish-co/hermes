import type { Purpose } from "~/lib/models/purpose";
import type { Article } from "../models/article";

export class RequestService {
    async listPurposes(): Promise<Purpose[]> {
        return await $fetch("/api/purposes", { method: "get" });
    }

    async searchArticles(query: string): Promise<Article[]> {
        const response = await $fetch("/api/search_article", {
            method: "post",
            body: {
                query,
            },
        });

        return response.articles;
    }
}
