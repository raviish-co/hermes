import { Note } from "./note";

export class GoodsReceiptNote extends Note {
    entryDate: string;

    constructor(entryDate: string) {
        super();
        this.entryDate = entryDate;
    }
}
