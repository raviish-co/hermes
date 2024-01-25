import { ArticleNotFound } from "../domain/articles/article_not_found_error";
import { InsufficientStock } from "../domain/articles/insufficient_stock_error";
import { PurposeNotFound } from "../domain/purposes/purpose_not_found_error";
import { InvalidTotal } from "../domain/requests/invalid_total_error";

export type NewRequestArticlesError =
    | PurposeNotFound
    | ArticleNotFound
    | InvalidTotal
    | InsufficientStock;
