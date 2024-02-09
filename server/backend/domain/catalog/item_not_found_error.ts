export class ItemNotFound extends Error {
    constructor(itemId: string) {
        super(`Item ${itemId} not found`);
    }
}
