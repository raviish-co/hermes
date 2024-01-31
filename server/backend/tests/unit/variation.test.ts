import { describe, expect, it } from "vitest";
import { Variation } from "../../domain/catalog/variation";

describe("Test Variation", () => {
    it("Deve ter a sua quantidade em stock uma variação **Cor: Vermelha**", () => {
        const colorVariation = Variation.create(options);

        expect(colorVariation.attribute.name).toEqual(color.name);
        expect(colorVariation.value.value).toEqual(red.value);
    });
});

const color = { name: "Cor" };
const red = { value: "Vermelha" };
const options = {
    attribute: color,
    value: red,
};
