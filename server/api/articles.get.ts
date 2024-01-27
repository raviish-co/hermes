import { makeArticlesDTO } from "../backend/application/article_dto";
import { makeArticleService } from "../backend/main";

export default defineEventHandler(async () => {
    const articleService = makeArticleService();
    const { result, pageToken, perPage, total } = await articleService.listArticles();

    const articles = makeArticlesDTO(result);

    return { articles, pageToken, perPage, total };
});
