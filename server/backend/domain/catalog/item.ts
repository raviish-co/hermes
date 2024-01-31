import { ID } from "../../shared/id";
import { Product } from "./product";

export class Item {
    readonly product: Product;
    readonly variations?: ID[];

    constructor(product: Product, variations?: ID[]) {
        this.product = product;
        this.variations = variations;
    }
}
