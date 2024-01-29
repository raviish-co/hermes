export function convertToNumber(value: string): number {
    return Number(value.replace(/\s/g, "").replace(",", ""));
}
