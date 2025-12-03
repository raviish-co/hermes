import type { PurposeModel } from "../models/purpose";

const LAUNDRAY = "Lavandaria";
const RECORD = "Gravação";

export class Purpose {
    description: string;
    details?: string;
    notes: string;

    constructor(description: string) {
        this.description = description;
        this.details = "";
        this.notes = "";
    }

    static build(data: PurposeModel): Purpose {
        const purpose = new Purpose(data.description);
        purpose.details = data.details;
        purpose.notes = data.notes;

        return purpose;
    }

    isValid() {
        if (this.isEmpty()) return false;

        if (this.isInvalidLaundray()) return false;

        if (this.isInvalidRecord()) return false;

        return true;
    }

    private isEmpty() {
        return !this.description || !this.notes;
    }

    private isInvalidLaundray(): boolean {
        return this.description === LAUNDRAY && !this.details;
    }

    private isInvalidRecord(): boolean {
        return this.description === RECORD && !this.details;
    }

    clear() {
        this.description = "";
        this.notes = "";
        this.details = "";
    }
}
