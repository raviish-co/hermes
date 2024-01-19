export class Amount {
    #value: string;

    private constructor(value: string) {
        this.#value = value;
    }

    static fromString(value: string): Amount {
        return new Amount(value);
    }

    add(amount: Amount): Amount {
        const factor = this.#convertToString(amount);
        let result;

        if (this.#isDecimal(this) && this.#isDecimal(amount)) {
            const { number: firstNumber, exponent } = this.#makeOperands(this.#value);
            const { number: secondNumber } = this.#makeOperands(factor);
            result = parseInt(firstNumber) + parseInt(secondNumber);
            result = this.#formatDecimal(result, exponent);
            return new Amount(result);
        }

        if (this.#isDecimal(amount)) {
            const { number, exponent } = this.#makeOperands(factor);
            result = parseInt(number) + parseInt(this.#value);
            result = this.#formatDecimal(result, exponent);
            return new Amount(result);
        }

        result = parseInt(factor) + parseInt(this.#value);
        result = result.toString();
        return new Amount(result.toString());
    }

    multiply(amount: Amount): Amount {
        const factor = this.#convertToString(amount);
        let result;

        if (this.#isDecimal(this)) {
            const { number, exponent } = this.#makeOperands(this.#value);
            result = parseInt(factor) * parseInt(number);
            result = this.#formatDecimal(result, exponent);
            return new Amount(result);
        }

        result = parseInt(factor) * parseInt(this.#value);
        result = result.toString();
        return new Amount(result);
    }

    #convertToString(amount: Amount): string {
        return amount.value.toString();
    }

    #isDecimal(amount: Amount): boolean {
        return amount.#value.indexOf(",") >= 1;
    }

    #makeOperands(value: string) {
        const idx = value.indexOf(",");
        const number = value.replace(",", "") + "00";
        const exponent = value.slice(idx + 1).length + 2;
        return {
            number,
            exponent,
        };
    }

    #formatDecimal(value: number, exponent: number): string {
        const result = value / Math.pow(10, exponent);
        return result.toFixed(2).toString().replace(".", ",");
    }

    get value(): string {
        return this.#value;
    }
}
