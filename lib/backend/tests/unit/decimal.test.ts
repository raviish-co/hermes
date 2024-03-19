import { describe, expect, it } from "vitest";
import { Decimal } from "../../shared/decimal";

describe("Test Case - Decimal", () => {
    it("Deve criar um decimal", () => {
        const number = new Decimal(10);

        expect(number.value).toEqual(10);
    });

    it("Deve somar dois decimais", () => {
        const number1 = new Decimal(10);

        const number2 = new Decimal(20);

        const result = number1.add(number2);

        expect(result).toBeInstanceOf(Decimal);
        expect(result.value).toEqual(30);
    });

    it("Deve somar dois numeros com casas decimais", () => {
        const number1 = new Decimal(10.81);

        const number2 = new Decimal(20.28);

        const result = number1.add(number2);

        expect(result.value).toEqual(31.09);
    });

    it("Deve multiplicar dois numeros sem casas decimais", () => {
        const number1 = new Decimal(10);

        const number2 = new Decimal(20);

        const result = number1.multiply(number2);

        expect(result.value).toEqual(200);
    });

    it("Deve multiplicar dois numeros com casas decimais", () => {
        const number1 = new Decimal(10.88);

        const number2 = new Decimal(20.17);

        const result = number1.multiply(number2);

        expect(result.value).toEqual(219.44);
    });

    it("Deve multiplicar dois numeros com casas decimais", () => {
        const number1 = new Decimal(11.47);

        const number2 = new Decimal(7.67);

        const result = number1.multiply(number2);

        expect(result.value).toEqual(87.97);
    });
});
