import { ItemNotFound } from "../catalog/item_not_found_error";
import { InvalidEntryDate } from "./invalid_entry_date_error";
import { InvalidLines } from "./invalid_lines_error";

export type GoodsReceiptError = InvalidEntryDate | InvalidLines | ItemNotFound;
