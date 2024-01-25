type PurposeOptions = {
    name: string;
    section?: string;
    recipient?: string;
};

export class Purpose {
    name: string;
    section?: string;
    recipient?: string;

    private constructor(name: string) {
        this.name = name;
    }

    static fromOptions(options: PurposeOptions): Purpose {
        const purpose = new Purpose(options.name);
        if (!options.section && !options.recipient) return purpose;
        purpose.section = options.section;
        purpose.recipient = options.recipient;
        return purpose;
    }
}
