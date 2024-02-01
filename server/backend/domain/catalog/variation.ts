import { ID } from "../../shared/id";

type Attribute = {
    name: string;
};

type VariationValue = {
    value: string;
};

type Options = {
    variationId: string;
    attribute: Attribute;
    value: VariationValue;
};

export class Variation {
    readonly variationId: ID;
    readonly attribute: Attribute;
    readonly value: VariationValue;

    private constructor(variationId: ID, attribute: Attribute, value: VariationValue) {
        this.variationId = variationId;
        this.attribute = attribute;
        this.value = value;
    }

    static create(options: Options): Variation {
        const { variationId, attribute, value } = options;
        return new Variation(ID.New(variationId), attribute, value);
    }
}
