export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-AO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
    }).format(value);
};

export function convertToNumber(value: string): number {
    return Number(value.replace(/\s/g, "").replace(",", ""));
}

export function removeSpaces(value: string): string {
    return value.replace(/\s/g, "");
}
