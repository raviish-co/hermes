export interface CsvReader {
    read(file: File): Promise<string[]>;
}
