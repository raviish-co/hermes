import { ID } from "../../shared/id";
import { Decimal } from "../../shared/decimal";

export enum ProductStatus {
    Good = "Bom",
    Bad = "Mau",
}

export type ProductCondition = {
    status: ProductStatus;
    comment?: string;
};

type Options = {
    productId: string;
    name: string;
    price: string;
    unique?: boolean;
    condition: ProductCondition;
};

export class Product {
    readonly productId: ID;
    readonly name: string;
    readonly price: Decimal;
    readonly condition: ProductCondition;
    #unique?: boolean;

    private constructor(productId: ID, name: string, price: Decimal, condition: ProductCondition) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.condition = condition;
        this.#unique = false;
    }

    static create(options: Options): Product {
        const { productId, name, unique, condition } = options;

        const newID = ID.New(productId);

        const price = Decimal.fromString(options.price);

        const product = new Product(newID, name, price, condition);

        if (unique) {
            product.#unique = unique;
            return product;
        }

        return product;
    }

    isUnique(): boolean {
        return this.#unique == true;
    }

    getCondition(): ProductCondition {
        return this.condition;
    }
}
