import currency from "currency.js";

export const formatCurrency = (value: number | string) =>
    currency(value, { fromCents: true, precision: 0 }).format({
        separator: ".",
        decimal: ",",
        symbol: "",
    });
