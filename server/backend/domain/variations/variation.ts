import { Attribute } from "./attribute";

type VariationValue = {
    value: string;
};

type VariationOptions = {
    attribute: Attribute;
    variationValue: VariationValue;
    stock: number;
};

export class Variation {
    readonly attribute: Attribute;
    readonly value: VariationValue;
    #stock: number;

    private constructor(attribute: Attribute, variationValue: VariationValue, stock: number) {
        this.attribute = attribute;
        this.value = variationValue;
        this.#stock = stock;
    }

    static create(options: VariationOptions): Variation {
        const { attribute, variationValue: variatonValue, stock } = options;
        return new Variation(attribute, variatonValue, stock);
    }

    increaseStock(quantity: number): void {
        this.#stock += quantity;
    }

    decreaseStock(quantity: number): void {
        this.#stock -= quantity;
    }

    getStock(): number {
        return this.#stock;
    }
}
