import { InsufficientStock } from "./insufficient_stock_error";
import { StockQuery } from "../shared/types";
import { Either } from "../shared/either";

export interface StockRepository {
    verifyStock(queries: StockQuery[]): Promise<Either<InsufficientStock, void>>;
}
