import { describe, expect, it } from "vitest";
import { Variation } from "../../domain/catalog/variation";
import { ID } from "../../shared/id";

describe("Test Variation", () => {
    it("Deve ter a sua quantidade em stock uma variação **Cor: Vermelha**", () => {
        const variation = new Variation(ID.New("1"), "Cor", ["Vermelha", "Azul"]);

        expect(variation.name).toEqual("Cor");
        expect(variation.values).toEqual(["Vermelha", "Azul"]);
    });

    it("Deve criar uma variação com o seu ID", () => {
        const variation = new Variation(ID.New("2"), "Cor", ["Vermelha", "Azul"]);

        expect(variation.variationId).toBeDefined();
    });
});

const options = {
    name: "Cor",
    values: ["Vermelha", "Azul"],
};
