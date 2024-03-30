export class InvalidVariations extends Error {
    constructor() {
        super("Variations are required");
    }
}
