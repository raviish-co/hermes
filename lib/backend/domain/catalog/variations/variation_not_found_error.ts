export class VariationNotFound extends Error {
    constructor(name: string) {
        super(`Variation ${name} not found`);
    }
}
