import { SequenceStorage } from "../../domain/sequence_storage";

export class InmemSequenceStorage implements SequenceStorage {
    #data: Record<string, number> = {};

    save(code: string, value: number): void {
        this.#data[code] = value;
    }

    get(code: string): number {
        return this.#data[code];
    }

    get records(): number[] {
        return Object.values(this.#data);
    }
}
