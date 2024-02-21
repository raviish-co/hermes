export class Purpose {
    description: string;
    details?: string;
    notes?: string;

    constructor(description: string, details?: string, notes?: string) {
        this.description = description;
        this.details = details;
        this.notes = notes;
    }
}
