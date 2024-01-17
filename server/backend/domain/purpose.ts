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
    [description: string]: string | undefined;
};

export class Purpose {
    name: string;
    section?: string;
    description?: string;

    private constructor(name: string) {
        this.name = name;
    }

    static fromOptions(options: PurposeOptions): Purpose {
        const purpose = new Purpose(options.name);
        if (!options.section && !options.description) return purpose;
        purpose.section = options.section;
        purpose.description = options.description;
        return purpose;
    }
}
