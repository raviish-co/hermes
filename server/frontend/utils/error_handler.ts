export function handleError(err: Error, cause: string): void {
    alert(err?.message || "Ocorreu um erro inesperado. Tente novamente mais tarde.");
    console.error(`[${cause}] ${err.message}:`, err);
    return;
}
