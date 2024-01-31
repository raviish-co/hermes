type Attribute = {
    name: string;
};

type VariationValue = {
    value: string;
};

type Options = {
    attribute: Attribute;
    value: VariationValue;
};

export class Variation {
    readonly attribute: Attribute;
    readonly value: VariationValue;

    private constructor(attribute: Attribute, value: VariationValue) {
        this.attribute = attribute;
        this.value = value;
    }

    static create(options: Options): Variation {
        const { attribute, value } = options;
        return new Variation(attribute, value);
    }
}
