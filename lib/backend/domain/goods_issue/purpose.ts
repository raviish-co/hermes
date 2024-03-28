export class Purpose {
    description: string;
    notes: string;
    details?: string;

    constructor(description: string, notes: string, details?: string) {
        this.description = description;
        this.details = details;
        this.notes = notes;
    }
}
