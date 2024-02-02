export class InsufficientStockItem extends Error {
    constructor(name: string) {
        super(`Product ${name} Stock Insufficient`);
    }
}
