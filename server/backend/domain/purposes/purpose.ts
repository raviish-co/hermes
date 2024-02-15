type PurposeOptions = {
    name: string;
    detail?: string;
    recipient?: string;
};

export class Purpose {
    name: string;
    detail?: string;
    recipient?: string;

    private constructor(name: string) {
        this.name = name;
    }

    static fromOptions(options: PurposeOptions): Purpose {
        const purpose = new Purpose(options.name);
        if (!options.detail && !options.recipient) return purpose;
        purpose.detail = options.detail;
        purpose.recipient = options.recipient;
        return purpose;
    }
}
