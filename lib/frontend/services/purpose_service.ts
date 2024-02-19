import type { PurposeModel } from "../models/purpose";

export class PurposeService {
    async listPurposes(): Promise<PurposeModel[]> {
        return await $fetch("/api/purpose-specifications", { method: "get" });
    }
}
