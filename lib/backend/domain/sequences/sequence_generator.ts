import type { SequenceStorage } from "./sequence_storage";
import { type Generator } from "./generator";

export class SequenceGenerator implements Generator {
    readonly storage: SequenceStorage;
    readonly initial: number;

    constructor(storage: SequenceStorage, initial: number = 1) {
        this.storage = storage;
        this.initial = initial;
    }

    generate(code: string): string {
        const next = this.#nextValue(code);
        const newId = this.#format(code, next);
        this.storage.save(code, next);
        return newId;
    }

    #format(code: string, value: number): string {
        return `${code} - ${value.toString().padStart(4, "0")}`;
    }

    #nextValue(code: string): number {
        let number = this.storage.get(code);

        if (!number) return this.initial;

        number += 1;

        return number;
    }
}
