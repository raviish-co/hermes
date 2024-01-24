import { Either } from "../shared/either";

export interface PurposeData {
    name: string;
    sections?: string[];
    placeholder?: string;
}

export class PurposeNotFound extends Error {
    constructor(name: string) {
        super(`Purpose ${name} not found`);
    }
}

export interface PurposeSource {
    list(): Promise<PurposeData[]>;
    find(name: string): Promise<Either<PurposeNotFound, PurposeData>>;
}

export type PurposeOptions = {
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
