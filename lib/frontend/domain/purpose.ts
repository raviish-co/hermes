const LAUNDRAY = "Lavandaria";
const RECORD = "Gravação";

export class Purpose {
    description: string;
    details?: string;
    notes: string;

    constructor(description: string, notes: string, details?: string) {
        this.description = description;
        this.details = details;
        this.notes = notes;
    }

    isValid() {
        if (!this.description || !this.notes) return false;

        if ((this.description === LAUNDRAY || this.description === RECORD) && !this.details)
            return false;

        return true;
    }

    clear() {
        this.description = "";
        this.notes = "";
        this.details = undefined;
    }
}
