export function handleError(err: Error, cause: string): void {
    console.error(`[${cause}] ${err.message}:`, err);
    alert(err.message || "Ocorreu um erro inesperado. Tente novamente mais tarde.");
    return;
}
