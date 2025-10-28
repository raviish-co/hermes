export class InvalidQuantitiesError extends Error {
    constructor(cause: string) {
        super(`${cause}: Good quantities or bad quantities must be 1`);
        this.name = "InvalidQuantitiesError";
        this.cause = cause;
        Object.setPrototypeOf(this, InvalidQuantitiesError.prototype);
    }
}
