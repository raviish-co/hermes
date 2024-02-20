import type { Reader } from "../../domain/readers/reader";

export const VALID_CSV_HEADER = ["nome,preco,unico,quantidade,estado,categoria,secao,departamento"];

export class CsvReader implements Reader {
    async read(file: File): Promise<string[]> {
        return (await file.text()).split("\n");
    }
}
