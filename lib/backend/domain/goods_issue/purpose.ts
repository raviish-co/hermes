import type { PurposeDTO } from "../../shared/types";

export class Purpose {
    description: string;
    details?: string;
    notes?: string;

    private constructor(description: string) {
        this.description = description;
    }

    static fromOptions(options: PurposeDTO): Purpose {
        const purpose = new Purpose(options.description);

        if (!options.detailConstraint && !options.notes) return purpose;

        purpose.details = options.detailConstraint;

        purpose.notes = options.notes;

        return purpose;
    }
}
