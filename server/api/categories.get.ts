import { Category } from "../backend/domain/catalog/category";
import { Subcategory } from "../backend/domain/catalog/subcategory";
import { makeServices } from "../backend/main";

const { catalogService } = makeServices();

interface CategoryDTO {
    name: string;
    department: string;
    subcategories: string[];
}

function makeCategoryDTO(category: Category): CategoryDTO {
    const subcategories = category.subcategories.map((s: Subcategory) => s.name);
    return {
        name: category.name,
        department: category.department,
        subcategories,
    };
}

export default defineEventHandler(async () => {
    const categories = await catalogService.getCategories();

    const categoryDTO = categories.map(makeCategoryDTO);

    return categoryDTO;
});
