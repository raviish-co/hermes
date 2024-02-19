export interface SequenceStorage {
    save(code: string, value: number): void;
    get(code: string): number;
}
