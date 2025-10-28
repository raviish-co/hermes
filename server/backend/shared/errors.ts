import type { InsufficientStock } from "../domain/catalog/items/insufficient_stock_error";
import type { ItemNotFound } from "../domain/catalog/items/item_not_found_error";
import type { InvalidTotal } from "../domain/goods_issue/invalid_total_error";
import type { InvalidPurpose } from "../domain/goods_issue/invalid_purpose_error";
import type { FileEmpty } from "../adapters/readers/file_empty_error";
import type { FileNotSupported } from "../adapters/readers/file_not_supported_error";
import type { InvalidFileHeader } from "../adapters/readers/invalid_file_header_error";
import type { InvalidGoodsIssueLineQuantity } from "../domain/goods_issue/invalid_goods_issue_line_quantity_error";
import type { GoodsIssueNoteNotFound } from "../domain/goods_issue/goods_issue_note_not_found_error";
import type { GoodsIssueLineNotFound } from "../domain/goods_issue/goods_lssue_line_not_found_error";
import { GoodsIssueNoteHasBeenReturned } from "../domain/goods_issue/goods_issue_note_has_been_returned_error";
import type { InvalidEntryDate } from "../domain/goods_receipt/invalid_entry_date_error";
import type { InvalidLines } from "../domain/goods_receipt/invalid_lines_error";
import type { CategoryAlreadyExists } from "../domain/catalog/categories/category_already_exists_error";
import type { VariationNotFound } from "../domain/catalog/variations/variation_not_found_error";
import type { CategoryNotFound } from "../domain/catalog/categories/category_not_found_error";
import type { SectionNotFound } from "../domain/catalog/departments/section_not_found_error";

export type GoodsIssueNoteError = InvalidPurpose | ItemNotFound | InvalidTotal | InsufficientStock;

export type GoodsReturnNoteError =
    | GoodsIssueNoteNotFound
    | InvalidGoodsIssueLineQuantity
    | GoodsIssueLineNotFound
    | GoodsIssueNoteHasBeenReturned;

export type FileError = InvalidFileHeader | FileEmpty | FileNotSupported | Error;

export type GoodsReceiptError = InvalidEntryDate | InvalidLines | ItemNotFound;

export type RegisterCategoryError = CategoryAlreadyExists | VariationNotFound;

export type ItemError = VariationNotFound | SectionNotFound | CategoryNotFound;
