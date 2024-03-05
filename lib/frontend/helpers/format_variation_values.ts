import type { VariationValue } from "../models/variation_value";

export function formatVariationValues(variationValues?: VariationValue[]): string {
    if (!variationValues) return "";

    const values = variationValues.map((v) => v.value);

    return values.join(" | ");
}
