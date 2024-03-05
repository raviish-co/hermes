import type { PurposeSpecificationModel } from "../models/purpose_specification";

export class PurposeService {
    async listPurposes(): Promise<PurposeSpecificationModel[]> {
        return await $fetch("/api/purpose-specifications", { method: "get" });
    }
}
