export class ValidationError extends Error {
    constructor(errors: string[], cause: string) {
        super(`Erro de validação: ${errors.join(" ")}`);
        this.name = "ValidationError";
        this.cause = cause;
    }
}
