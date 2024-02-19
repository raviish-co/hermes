export class ItemCategoryNotFound extends Error {
    constructor(itemId: string) {
        super(`Item ${itemId} not found`);
    }
}
