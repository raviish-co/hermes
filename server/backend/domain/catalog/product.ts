import { Subcategory } from "./subcategory";
import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";

type Options = {
    productId?: string;
    name: string;
    price: string;
    unique?: boolean;
    subcategory: Subcategory;
};

export class Product {
    readonly productId: ID;
    readonly name: string;
    readonly price: Decimal;
    readonly subcategory: Subcategory;
    #unique?: boolean;

    private constructor(productId: ID, name: string, price: Decimal, subcategory: Subcategory) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.subcategory = subcategory;
        this.#unique = false;
    }

    static create(options: Options): Product {
        const { name, unique, subcategory, productId } = options;

        const price = Decimal.fromString(options.price);

        const newID = productId ? ID.New(productId) : ID.RandomUUID();

        const product = new Product(newID, name, price, subcategory);

        if (!unique) return product;

        product.#unique = unique;

        return product;
    }

    isUnique(): boolean {
        return this.#unique == true;
    }
}
