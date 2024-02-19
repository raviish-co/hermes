import { handleException } from "@frontend/helpers/error_handler";
import type { PurposeModel } from "@frontend/models/purpose";
import { PurposeService } from "@frontend/services/purpose_service";

export default function () {
    const purposeService = new PurposeService();

    const purposes = ref<PurposeModel[]>([]);

    async function refresh() {
        const purposesOrVoid = await purposeService.listPurposes().catch(handleException);

        purposes.value = purposesOrVoid || [];
    }

    return { refresh, purposes: useState("purposes", () => purposes) };
}
