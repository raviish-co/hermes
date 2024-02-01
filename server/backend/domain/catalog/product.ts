import { ID } from "../../shared/id";
import { Decimal } from "../../shared/decimal";

type Options = {
    productId: string;
    name: string;
    price: string;
    unique?: boolean;
    subcategory: string;
};

export class Product {
    readonly productId: ID;
    readonly name: string;
    readonly price: Decimal;
    readonly subcategory: string;
    #unique?: boolean;

    private constructor(productId: ID, name: string, price: Decimal, subcategory: string) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.subcategory = subcategory;
        this.#unique = false;
    }

    static create(options: Options): Product {
        const { productId, name, unique, subcategory } = options;

        const newID = ID.New(productId);

        const price = Decimal.fromString(options.price);

        const product = new Product(newID, name, price, subcategory);

        if (!unique) return product;

        product.#unique = unique;

        return product;
    }

    isUnique(): boolean {
        return this.#unique == true;
    }
}
