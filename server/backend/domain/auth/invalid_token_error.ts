export class InvalidTokenError extends Error {
    constructor() {
        super("User name already exists");
    }
}
