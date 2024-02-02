import { InsufficientStockItem } from "../domain/sequences/insufficient_item_stock_error";
import { PurposeNotFound } from "../domain/purposes/purpose_not_found_error";
import { ProductNotFound } from "../domain/catalog/product_not_found_error";
import { InvalidTotal } from "../domain/requests/invalid_total_error";

export type RequestError = PurposeNotFound | ProductNotFound | InvalidTotal | InsufficientStockItem;
