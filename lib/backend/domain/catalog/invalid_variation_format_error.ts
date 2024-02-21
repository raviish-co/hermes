export class InvalidVariationFormat extends Error {
    constructor(name: string) {
        super(`Invalid variation format: ${name}`);
    }
}
