export class InvalidCsvRow extends Error {
    constructor() {
        super("Empty file");
    }
}
