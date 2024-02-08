import { randomUUID } from "node:crypto";

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

    static RandomUUID(): ID {
        return new ID(randomUUID());
    }

    toString(): string {
        return this.#value;
    }
}
