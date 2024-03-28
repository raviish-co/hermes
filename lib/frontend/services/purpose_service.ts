import type { PurposeSpecificationModel } from "../models/purpose_specification";

export class PurposeService {
    async listPurposes(): Promise<PurposeSpecificationModel[]> {
        const purposes = await $fetch("/api/purpose-specifications", { method: "get" });
        return purposes.map(this.#toPurposeSpecificationModel);
    }

    #toPurposeSpecificationModel(data: any): PurposeSpecificationModel {
        return {
            description: data.description,
            detailsConstraint: data.detailsConstraint,
            notesType: data.notesType,
        };
    }
}
