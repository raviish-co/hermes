import { Reader } from "./reader";

export const validCsvHeader = [
    "name,price,isunique,quantity",
    "name,price,isunique,quantity,comment",
];

export class CsvReader implements Reader {
    async read(file: File): Promise<string[]> {
        return (await file.text()).split("\n");
    }
}
