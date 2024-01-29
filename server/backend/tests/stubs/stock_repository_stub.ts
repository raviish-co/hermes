import { InsufficientStock } from "../../domain/insufficient_stock_error";
import { StockRepository } from "../../domain/stock_repository";
import { Either, left, right } from "../../shared/either";
import { StockItem } from "../../domain/stock_item";
import { StockQuery } from "../../shared/types";
import { ID } from "../../shared/id";

export class StockRepositoryStub implements StockRepository {
    #data: StockItem[] = [];

    constructor() {
        this.#populate();
    }

    async verifyStock(queries: StockQuery[]): Promise<Either<InsufficientStock, void>> {
        for (const query of queries) {
            const item = this.#data.find(
                (item) => item.itemId.toString() === query.itemId.toString()
            );
            if (item!.verifyStock(query.quantity))
                return Promise.resolve(left(new InsufficientStock(item!.itemId.toString())));
        }

        return Promise.resolve(right(undefined));
    }

    #populate(): void {
        const stock1 = new StockItem(ID.New("1001"), 10);
        const stock2 = new StockItem(ID.New("1002"), 5);
        const stock3 = new StockItem(ID.New("1003"), 3);
        this.#data.push(stock1, stock2, stock3);
    }
}
