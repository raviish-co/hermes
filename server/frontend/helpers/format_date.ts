export function formatDate(value: string) {
    const date = new Date(value);
    return new Intl.DateTimeFormat("pt-PT", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "Africa/Luanda",
    }).format(date);
}
