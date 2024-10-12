export class Password {
    #value: string;

    private constructor(value: string) {
        this.#value = value;
    }

    static fromString(value: string): Password {
        return new Password(value);
    }

    isValid(rawPassword: string): boolean {
        return this.#value === rawPassword;
    }
}
