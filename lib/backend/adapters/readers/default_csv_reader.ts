import type { CsvReader } from "./reader";

export const VALID_ITEM_STOCK_CSV_HEADER = ["id,boas,com_defeito"];

export interface CsvRow {
    name: string;
    price: number;
    category: string;
    section: string;
    variations: Record<string, string>;
}

export class DefaultCsvReader implements CsvReader {
    async read(file: File): Promise<string[]> {
        return (await file.text()).split("\n");
    }
}

export function processLine(line: string, lines: string[]) {
    const headers = lines[0].split(",");
    const values = line.split(",");

    const row: CsvRow = {
        name: values[0],
        price: Number(values[1]),
        category: values[2],
        section: values[3],
        variations: {},
    };

    for (let i = 4; i < values.length; i++) {
        row.variations[headers[i]] = values[i];
    }

    return row;
}
