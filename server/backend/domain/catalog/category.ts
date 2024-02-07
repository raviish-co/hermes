import { Subcategory, Options } from "./subcategory";

export class Category {
    readonly department: string;
    name: string;
    subcategories: Subcategory[] = [];

    private constructor(name: string, department: string) {
        this.name = name;
        this.department = department;
    }

    static create(options: Options) {
        const { name, subcategory, department } = options;

        const category = new Category(name, department);

        category.addSubcategory(subcategory);

        return category;
    }

    addSubcategory(subcategory: Subcategory) {
        this.subcategories.push(subcategory);
    }
}
