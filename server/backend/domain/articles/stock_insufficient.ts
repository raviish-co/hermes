export class StockInsufficient extends Error {
    constructor(name: string) {
        super(`Article ${name} Stock Insufficient`);
    }
}
