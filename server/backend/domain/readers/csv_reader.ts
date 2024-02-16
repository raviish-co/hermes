import { Reader } from "./reader";

export const validCsvHeader = ["nome,preco,unico,quantidade,estado,categoria,secao,departamento"];

export class CsvReader implements Reader {
    async read(file: File): Promise<string[]> {
        return (await file.text()).split("\n");
    }
}
