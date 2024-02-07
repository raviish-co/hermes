import { InsufficientStockItem } from "../domain/sequences/insufficient_item_stock_error";
import { PurposeNotFound } from "../domain/purposes/purpose_not_found_error";
import { ProductNotFound } from "../domain/catalog/product_not_found_error";
import { InvalidTotal } from "../domain/requests/invalid_total_error";
import { InvalidFileHeader } from "../domain/readers/invalid_file_header_error";
import { FileEmpty } from "../domain/readers/file_empty_error";
import { FileNotSupported } from "../domain/readers/file_not_supported_error";

export type RequestError = PurposeNotFound | ProductNotFound | InvalidTotal | InsufficientStockItem;

export type FileError = InvalidFileHeader | FileEmpty | FileNotSupported;
