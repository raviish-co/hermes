export class PdfGenerationError extends Error {
    constructor(message: string, cause: string) {
        super(message);
        this.name = "PDFGenerationError";
        this.cause = cause;
    }
}
