import { describe, expect, it } from "vitest";
import { Variation } from "../../domain/variations/variation";
import { Attribute } from "../../domain/variations/attribute";

describe("Test Variation", () => {
    it("Deve ter a sua quantidade em stock uma variação **Cor: Vermelha**", () => {
        const colorVariation = Variation.create(options);

        expect(colorVariation.getStock()).toEqual(10);
        expect(colorVariation.attribute).toEqual(color);
        expect(colorVariation.value).toEqual(red);
    });

    it("Deve aumentar a quantidade em stock da variação **Cor: Vermelha**", () => {
        const colorVariation = Variation.create(options);

        colorVariation.increaseStock(3);

        expect(colorVariation.getStock()).toEqual(13);
    });

    it("Deve diminuir a quantidade em stock da variação **Cor: Vermelha**", () => {
        const colorVariation = Variation.create(options);

        colorVariation.decreaseStock(3);

        expect(colorVariation.getStock()).toEqual(7);
    });
});

const color = new Attribute("Cor");
const red = { value: "Vermelha" };
const options = {
    attribute: color,
    variationValue: red,
    stock: 10,
};
