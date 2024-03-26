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
        console.log(this);

        if (!this.description) return false;

        if (!this.notes) return false;

        if (!this.isLaundrayOrRecord()) return false;

        return true;
    }

    private isLaundrayOrRecord() {
        return this.isLaundray() || this.isRecord();
    }

    private isLaundray(): boolean {
        return this.description === LAUNDRAY && this.details !== undefined;
    }

    private isRecord(): boolean {
        return this.description === RECORD && this.details !== undefined;
    }

    clear() {
        this.description = "";
        this.notes = "";
        this.details = undefined;
    }
}
