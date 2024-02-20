export class InsufficientStock extends Error {
    constructor(name: string) {
        super(`Item ${name} Stock Insufficient`);
    }
}
