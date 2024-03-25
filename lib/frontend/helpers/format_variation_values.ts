import type { VariationValueModel } from "../models/variation_value";

export function formatVariationValues(variationValues?: VariationValueModel[]): string {
    if (!variationValues) return "";

    const values = variationValues.map((v) => v.value);

    return values.join(" | ");
}
