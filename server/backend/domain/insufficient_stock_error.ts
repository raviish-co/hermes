export class InsufficientStock extends Error {
    constructor(name: string) {
        super(`Product ${name} Stock Insufficient`);
    }
}
