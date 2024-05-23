import type { Reader } from "./reader";

export const VALID_ITEM_CSV_HEADER = ["nome,preco,estado,categoria,seccao,variacoes"];
export const VALID_ITEM_STOCK_CSV_HEADER = ["id,boas,com_defeito"];

export class CsvReader implements Reader {
    async read(file: File): Promise<string[]> {
        return (await file.text()).split("\n");
    }
}
