export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-AO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
    }).format(value);
};
