export const formatCurrency = (value: number): string => {
    const currency = value / 100;
    return new Intl.NumberFormat("pt-AO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
    }).format(currency);
};
