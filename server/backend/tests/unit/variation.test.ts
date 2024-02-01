import { describe, expect, it } from "vitest";
import { Variation } from "../../domain/catalog/variation";

describe("Test Variation", () => {
    it("Deve ter a sua quantidade em stock uma variação **Cor: Vermelha**", () => {
        const colorVariation = Variation.create(options);

        expect(colorVariation.attribute.name).toEqual(color.name);
        expect(colorVariation.value.value).toEqual(red.value);
    });

    it("Deve criar uma variação com o seu ID", () => {
        const variation = Variation.create(options);

        expect(variation.variationId).toBeDefined();
        expect(variation.variationId.toString()).toEqual("1001");
    });
});

const color = { name: "Cor" };
const red = { value: "Vermelha" };
const options = {
    variationId: "1001",
    attribute: color,
    value: red,
};
