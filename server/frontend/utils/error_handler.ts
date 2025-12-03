export function handleError(err: any, cause: string, message: string): void {
    if (err?.statusCode === 500) {
        alert(message);
        console.error(`[${cause}] ${message}:`, err);
        return;
    }

    alert(err?.statusMessage || "Ocorreu um erro inesperado. Tente novamente mais tarde.");
    console.error(`[${cause}] ${message}:`, err);
    return;
}
