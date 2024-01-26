import type { Purpose } from "~/lib/models/purpose";
import type { Article } from "../models/article";

export class ArticleService {
    async listPurposes(): Promise<Purpose[]> {
        return await $fetch("/api/list_purposes", { method: "get" });
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
