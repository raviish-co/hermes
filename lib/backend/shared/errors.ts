import { InsufficientStockItem } from "../../domain/catalog/insufficient_item_stock_error";
import { ItemCategoryNotFound } from "../../domain/catalog/item_category_not_found_error";
import { PurposeNotFound } from "../../domain/goods_issue/purpose_not_found_error";
import { InvalidFileHeader } from "../../domain/readers/invalid_file_header_error";
import { FileNotSupported } from "../../domain/readers/file_not_supported_error";
import { InvalidTotal } from "../../domain/goods_issue/invalid_total_error";
import { FileEmpty } from "../../domain/readers/file_empty_error";

export type GoodsIssueError =
    | PurposeNotFound
    | ItemCategoryNotFound
    | InvalidTotal
    | InsufficientStockItem;

export type FileError = InvalidFileHeader | FileEmpty | FileNotSupported;
