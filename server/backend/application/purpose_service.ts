import specs from "../data/purposes.json";

interface PurposeSpec {
    description: string;
    notesType: string;
    detailsConstraint: string[];
}

export class PurposeService {
    async listPurposeSpecifications(): Promise<PurposeSpec[]> {
        return Promise.resolve(specs);
    }
}
