import { NoteLine } from "./note_line";

export class ReturnNoteLine extends NoteLine {
    constructor(
        itemId: string,
        name: string,
        quantity: number,
        quantityRequested: number,
        quantityReturned: number
    ) {
        super(itemId, name, quantity, quantityReturned);
        this.quantityRequested = quantityRequested;
        this.calculate();
    }
}
