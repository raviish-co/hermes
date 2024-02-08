import { Category } from "../backend/domain/catalog/category";
import { makeServices } from "../backend/main";

const { catalogService } = makeServices();

interface CategoryDTO {
    name: string;
    department: string;
    subcategories: string[];
}

function makeCategoryDTO(category: Category): CategoryDTO {
    const subcategories = category.subcategories.map((s: any) => s.name);
    return {
        name: category.name,
        department: category.department,
        subcategories,
    };
}

export default defineEventHandler(async () => {
    const categories = await catalogService.getCategories();

    const categoryDTOs = categories.map(makeCategoryDTO);

    return categoryDTOs;
});
