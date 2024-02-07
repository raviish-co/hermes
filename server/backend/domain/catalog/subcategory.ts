import { ID } from "../../shared/id";

export type Subcategory = {
    subcategoryId: ID;
    name: string;
};

export type Options = {
    name: string;
    subcategory: Subcategory;
    department: string;
};
