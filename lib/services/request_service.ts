import type { Purpose } from "~/lib/models/purpose";
import type { Article } from "../models/article";
import { Article as DomainArticle } from "@/server/backend/domain/articles/article";

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

        return response.result.map((a) => this.#convertToArticle(a as DomainArticle));
    }

    #convertToArticle(article: DomainArticle): Article {
        return {
            id: article.articleId.toString(),
            name: article.title,
            price: Number(article.price.value),
            securityDeposit: Number(article.getSecurityDeposit().value),
            isUnique: article.isUnique(),
        };
    }
}
