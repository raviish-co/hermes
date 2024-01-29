export class ProductNotFound extends Error {
    constructor(productId: string) {
        super(`Product ${productId} not found`);
    }
}
