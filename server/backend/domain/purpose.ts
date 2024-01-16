export interface Purpose {
    name: string;
    sections?: string[];
}

export interface PurposeSource {
    list(): Promise<Purpose[]>;
}
