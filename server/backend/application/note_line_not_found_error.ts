export class NoteLineNotFoundError extends Error {
    constructor(cause: string, itemId: string) {
        super(`${cause}: Noteline with item id ${itemId} not found`);
        this.name = "NoteLineNotFoundError";
        this.cause = cause;
    }
}
