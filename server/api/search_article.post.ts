import { Article } from "../backend/domain/articles/article";
import { makeArticleService } from "../backend/main";

interface ArticleDTO {
    id: string;
    name: string;
    price: number;
    isUnique: boolean;
    securityDeposit: number;
}

export default defineEventHandler(async (event) => {
    const { query } = await readBody(event);

    const requestService = makeArticleService();

    const { result, pageToken, perPage, total } = await requestService.searchArticles(query);

    const articles = makeArticleDTO(result);

    return { articles, pageToken, perPage, total };
});

function makeArticleDTO(articles: Article[]): ArticleDTO[] {
    return articles.map((a) => ({
        id: a.articleId.toString(),
        name: a.title,
        price: Number(a.price.value.replace(",", ".")),
        isUnique: a.isUnique(),
        securityDeposit: Number(a.getSecurityDeposit().value.replace(",", ".")),
    }));
}
