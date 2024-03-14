export class Decimal {
    #value: string;

    private constructor(value: string) {
        this.#value = value;
    }

    static fromString(value: string): Decimal {
        const formatter = new Intl.NumberFormat("pt-AO", {
            useGrouping: false,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return new Decimal(formatter.format(Number(value.replace(",", "."))));
    }

    add(number: Decimal): Decimal {
        const { firstNumber, secondNumber } = this.#makeOperands(number);
        const result = (firstNumber + secondNumber) / 100;
        return Decimal.fromString(result.toString());
    }

    multiply(number: Decimal): Decimal {
        const { firstNumber, secondNumber } = this.#makeOperands(number);
        const result = (firstNumber * secondNumber) / 10000;
        return Decimal.fromString(result.toString());
    }

    isZero(): boolean {
        return this.#value === "0,00";
    }

    #makeOperand(value: string): number {
        return parseInt(value.replace(",", ""));
    }

    #makeOperands(number: Decimal) {
        return {
            firstNumber: this.#makeOperand(number.value),
            secondNumber: this.#makeOperand(this.#value),
        };
    }

    get value(): string {
        return this.#value;
    }
}
