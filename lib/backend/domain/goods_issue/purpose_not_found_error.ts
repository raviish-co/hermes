export class PurposeNotFound extends Error {
    constructor(name: string) {
        super(`Purpose ${name} not found`);
    }
}
