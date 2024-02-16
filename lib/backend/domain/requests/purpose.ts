type Options = {
    description: string;
    details?: string;
    notes?: string;
};

export class Purpose implements Options {
    description: string;
    details?: string;
    notes?: string;

    private constructor(description: string) {
        this.description = description;
    }

    static fromOptions(options: Options): Purpose {
        const purpose = new Purpose(options.description);
        if (!options.details && !options.notes) return purpose;
        purpose.details = options.details;
        purpose.notes = options.notes;
        return purpose;
    }
}
