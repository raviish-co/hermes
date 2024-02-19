import { InsufficientStockItem } from "@backend/domain/catalog/insufficient_item_stock_error";
import { ItemCategoryNotFound } from "@backend/domain/catalog/item_category_not_found_error";
import { PurposeNotFound } from "@backend/domain/goods_issue/purpose_not_found_error";
import { InvalidFileHeader } from "@backend/domain/readers/invalid_file_header_error";
import { FileNotSupported } from "@backend/domain/readers/file_not_supported_error";
import { InvalidTotal } from "@backend/domain/goods_issue/invalid_total_error";
import { FileEmpty } from "@backend/domain/readers/file_empty_error";

export type GoodsIssueError =
    | PurposeNotFound
    | ItemCategoryNotFound
    | InvalidTotal
    | InsufficientStockItem;

export type FileError = InvalidFileHeader | FileEmpty | FileNotSupported;
