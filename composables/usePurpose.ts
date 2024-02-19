import { handleException } from "~/lib/helpers/error_handler";
import type { PurposeModel } from "~/lib/models/purpose";
import { RequestService } from "~/lib/services/request_service";

export default function () {
    const requestService = new RequestService();

    const purposes = ref<PurposeModel[]>([]);

    async function refresh() {
        const purposesOrVoid = await requestService.listPurposes().catch(handleException);

        purposes.value = purposesOrVoid || [];
    }

    return { refresh, purposes: useState("purposes", () => purposes) };
}
