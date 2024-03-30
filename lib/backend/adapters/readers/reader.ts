export interface Reader {
    read(file: File): Promise<string[]>;
}
