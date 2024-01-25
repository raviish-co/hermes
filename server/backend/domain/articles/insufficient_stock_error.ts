export class InsufficientStock extends Error {
    constructor(name: string) {
        super(`Article ${name} Stock Insufficient`);
    }
}
