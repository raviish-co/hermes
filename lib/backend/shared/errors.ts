import type { InsufficientStock } from "../domain/catalog/insufficient_stock_error";
import type { InvalidVariationFormat } from "../domain/catalog/invalid_variation_format_error";
import type { ItemNotFound } from "../domain/catalog/item_not_found_error";
import type { InvalidTotal } from "../domain/goods_issue/invalid_total_error";
import type { InvalidPurpose } from "../domain/goods_issue/invalid_purpose_error";
import type { FileEmpty } from "../domain/readers/file_empty_error";
import type { FileNotSupported } from "../domain/readers/file_not_supported_error";
import type { InvalidFileHeader } from "../domain/readers/invalid_file_header_error";
import type { InvalidGoodsIssueLineQuantity } from "../domain/goods_issue/invalid_goods_issue_line_quantity_error";
import type { GoodsIssueNoteNotFound } from "../domain/goods_issue/goods_issue_note_not_found_error";

export type GoodsIssueNoteError = InvalidPurpose | ItemNotFound | InvalidTotal | InsufficientStock;

export type GoodsReturnNoteError = GoodsIssueNoteNotFound | InvalidGoodsIssueLineQuantity;

export type FileError =
    | InvalidFileHeader
    | FileEmpty
    | FileNotSupported
    | InvalidVariationFormat
    | Error;
