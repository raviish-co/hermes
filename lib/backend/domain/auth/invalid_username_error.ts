export class InvalidUsernameError extends Error {
    constructor() {
        super("User name already exists");
    }
}
