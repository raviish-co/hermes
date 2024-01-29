import { ProductNotFound } from "../domain/products/product_not_found_error";
import { InsufficientStock } from "../domain/insufficient_stock_error";
import { PurposeNotFound } from "../domain/purposes/purpose_not_found_error";
import { InvalidTotal } from "../domain/requests/invalid_total_error";

export type NewRequestProductsError =
    | PurposeNotFound
    | ProductNotFound
    | InvalidTotal
    | InsufficientStock;
