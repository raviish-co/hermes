export class ID {
    #value: string;

    private constructor(raw: string) {
        this.#value = raw;
    }

    static New(raw: string): ID {
        return new ID(raw);
    }

    static Random(): ID {
        return ID.New(Math.random().toString(36).substring(2, 15));
    }

    toString(): string {
        return this.#value;
    }
}
