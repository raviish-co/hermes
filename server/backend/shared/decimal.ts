export class Decimal {
    #value: number;

    constructor(value: number) {
        this.#value = value;
    }

    add(number: Decimal) {
        const { firstNumber, secondNumber } = this.#makeOperands(number);

        const result = (firstNumber + secondNumber) / this.#pow(10, 2);

        return new Decimal(result);
    }

    multiply(number: Decimal) {
        const { firstNumber, secondNumber } = this.#makeOperands(number);

        const result = (firstNumber * secondNumber) / this.#pow(10, 4);

        return new Decimal(this.#formatNumber(result));
    }

    #makeOperands(number: Decimal) {
        const firstNumber = this.#convertToInteger(this.value);
        const secondNumber = this.#convertToInteger(number.value);
        return { firstNumber, secondNumber };
    }

    #convertToInteger(value: number) {
        return value * this.#pow(10, 2);
    }

    #pow(value: number, pow: number) {
        return Math.pow(value, pow);
    }

    #formatNumber(result: number) {
        return Number((Math.floor(result * 100) / 100).toFixed(2));
    }

    get value() {
        return this.#value;
    }
}
