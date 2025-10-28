export class InvalidPurpose extends Error {
    constructor(name: string) {
        super(`Purpose ${name} is invalid`);
    }
}
