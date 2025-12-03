import type { PurposeSpecificationModel } from "@frontend/models/purpose_specification";
import { PurposeService } from "@frontend/services/purpose_service";

export default function () {
    const service = new PurposeService();

    const specifications = ref<PurposeSpecificationModel[]>([]);

    async function refresh() {
        specifications.value = await service.listPurposes();
    }

    return {
        refresh,
        specifications: useState("purposeSpecifications", () => specifications),
    };
}
