import { makeArticlesDTO } from "../backend/application/article_dto";
import { makeArticleService } from "../backend/main";

export default defineEventHandler(async (event) => {
    const { query } = getQuery(event);

    const articleService = makeArticleService();

    const { result, pageToken, perPage, total } = await articleService.searchArticles(
        query as string
    );

    const articles = makeArticlesDTO(result);

    return { articles, pageToken, perPage, total };
});
