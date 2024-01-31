import { makeProductsDTO } from "../backend/application/product_dto";
import { makeProductService } from "../backend/main";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const page = Number(query.pageToken);

    const articleService = makeProductService();

    const { result, pageToken, perPage, total } = await articleService.listArticles(page);

    const products = makeProductsDTO(result);

    return { products, pageToken, perPage, total };
});
