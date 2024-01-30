import type { Article } from "../models/article";

interface ArticleList {
    articles: Article[];
    total: number;
}

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

    async listAtricles(pageToken?: number): Promise<ArticleList> {
        const response = await $fetch(`/api/articles?pageToken=${pageToken}`, {
            method: "get",
        });

        return { articles: response.articles, total: response.total };
    }
}
