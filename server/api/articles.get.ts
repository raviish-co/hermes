import { makeArticlesDTO } from "../backend/application/article_dto";
import { makeArticleService } from "../backend/main";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const page = Number(query.pageToken);

    const articleService = makeArticleService();

    const { result, pageToken, perPage, total } = await articleService.listArticles(page);

    const articles = makeArticlesDTO(result);

    return { articles, pageToken, perPage, total };
});
