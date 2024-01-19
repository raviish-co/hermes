export interface PurposeData {
    name: string;
    sections?: string[];
}

export interface PurposeSource {
    list(): Promise<PurposeData[]>;
}

export type PurposeOptions = {
    name: string;
    section?: string;
    destination?: string;
};

export class Purpose {
    name: string;
    section?: string;
    destination?: string;

    private constructor(name: string) {
        this.name = name;
    }

    static fromOptions(options: PurposeOptions): Purpose {
        const purpose = new Purpose(options.name);
        if (!options.section && !options.destination) return purpose;
        purpose.section = options.section;
        purpose.destination = options.destination;
        return purpose;
    }
}
