import type { SequenceStorage } from "../../adapters/sequences/sequence_storage";

export class InmemSequenceStorage implements SequenceStorage {
    #sequences: Record<string, number> = {};

    save(code: string, value: number): void {
        this.#sequences[code] = value;
    }

    get(code: string): number {
        return this.#sequences[code];
    }

    get records(): number[] {
        return Object.values(this.#sequences);
    }
}
