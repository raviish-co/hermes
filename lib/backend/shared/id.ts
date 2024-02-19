import cripto from "node:crypto";

export class ID {
    #value: string;

    private constructor(raw: string) {
        this.#value = raw;
    }

    static New(raw: string): ID {
        return new ID(raw);
    }

    static random(): ID {
        const uuid = cripto.randomUUID();
        return new ID(uuid);
    }

    toString(): string {
        return this.#value;
    }
}
