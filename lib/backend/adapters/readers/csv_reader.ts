import type { Reader } from "./reader";
export const VALID_CSV_HEADER = ["nome,preco,estado,categoria,seccao,variacoes"];

export class CsvReader implements Reader {
    async read(file: File): Promise<string[]> {
        return (await file.text()).split("\n");
    }
}
