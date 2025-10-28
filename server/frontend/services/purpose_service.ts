import type { PurposeSpecificationModel } from "../models/purpose_specification";
import { useAuth } from "@app/composables/useAuth";

const auth = useAuth();

export class PurposeService {
    async listPurposes(): Promise<PurposeSpecificationModel[]> {
        const purposes = await $fetch("/api/purpose-specifications", {
            method: "get",
            headers: await this.#headers(),
        });
        return purposes.map(this.#toPurposeSpecificationModel);
    }

    #toPurposeSpecificationModel(data: any): PurposeSpecificationModel {
        return {
            description: data.description,
            detailsConstraint: data.detailsConstraint,
            notesType: data.notesType,
        };
    }

    async #headers() {
        return {
            "X-Access-Token": await auth.getAccessToken(),
        };
    }
}
