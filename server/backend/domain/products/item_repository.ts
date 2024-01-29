import { ProductNotFound } from "./product_not_found_error";
import { Pagination } from "../../shared/pagination";
import { ProductQuery } from "../../shared/types";
import { Either } from "../../shared/either";
import { ID } from "../../shared/id";
import { Product } from "./product";
import { Item } from "./item";

export interface ItemRepository {
    getAll(products: ProductQuery[]): Promise<Either<ProductNotFound, Item[]>>;
    getById(productId: ID): Promise<Product>;
    list(pageToken: number, perPage: number): Promise<Pagination<Product>>;
    search(query: string, pageToken: number, perPage: number): Promise<Pagination<Product>>;
}
