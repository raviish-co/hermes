export class Username {
    #value: string;

    private constructor(value: string) {
        this.#value = value;
    }

    static fromString(value: string): Username {
        return new Username(value);
    }

    get value(): string {
        return this.#value;
    }
}
