import type { VariationValueModel } from "../models/variation_value";

export function formatVariationValues(variations?: VariationValueModel[]): string {
    if (!variations) return "";

    const values = variations.map((v) => v.fulltext);

    return values.join(" | ");
}
