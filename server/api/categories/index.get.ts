import { Category } from "~/lib/backend/domain/catalog/categories/category";
import { makeServices } from "~/lib/backend/main";

const { catalogService } = makeServices();

interface CategoryDTO {
    categoryId: string;
    name: string;
    variationsIds: string[];
}

function toCategoryDTO(category: Category): CategoryDTO {
    return {
        categoryId: category.categoryId.toString(),
        name: category.name,
        variationsIds: category.variationsIds.map((id) => id.toString()),
    };
}

export default defineEventHandler(async (event) => {
    const categories = await catalogService.listCategories();
    return categories.map(toCategoryDTO);
});
