import { useCatalogService } from "~/composables/useCatalogService";
import { Category } from "~/lib/backend/domain/catalog/categories/category";
import { checkAnonymousUser } from "~/server/api/check_anonymous_user";

const service = useCatalogService();

interface CategoryDTO {
    categoryId: string;
    name: string;
    variationsIds: string[];
    description?: string;
}

function toCategoryDTO(category: Category): CategoryDTO {
    return {
        categoryId: category.categoryId.toString(),
        name: category.name,
        variationsIds: category.variationsIds.map((id) => id.toString()),
        description: category.description,
    };
}

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const categories = await service.listCategories();

    return categories.map(toCategoryDTO);
});
