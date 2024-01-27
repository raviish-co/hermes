import type { Article } from "../models/article";

export class ArticleService {
    async searchArticles(query: string): Promise<Article[]> {
        const response = await $fetch("/api/search_article", {
            method: "post",
            body: {
                query,
            },
        });

        return response.articles;
    }

    async listAtricles(): Promise<Article[]> {
        const response = await $fetch("/api/articles", {
            method: "get",
        });

        return response.articles;
    }
}
