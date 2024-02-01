import { makeProductsDTO } from "../backend/application/product_dto";
import { makeProductService } from "../backend/main";

export default defineEventHandler(async (event) => {
    const { query } = getQuery(event);

    const productService = makeProductService();

    const { result, pageToken, perPage, total } = await productService.searchItems(query as string);

    const products = makeProductsDTO(result);

    return { products, pageToken, perPage, total };
});
