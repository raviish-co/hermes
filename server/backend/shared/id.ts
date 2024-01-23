export class ID {
    #value: string;

    private constructor(raw: string) {
        this.#value = raw;
    }

    static New(raw: string): ID {
        return new ID(raw);
    }

    toString(): string {
        return this.#value;
    }
}
