import { PurposeModel } from "~/lib/models/purpose";
import { PurposeData } from "../backend/domain/purposes/purpose_data";
import { makeServices } from "../backend/main";

const { requestService } = makeServices();

export default defineEventHandler(async () => {
    const purposes = await requestService.listPurposes();
    return makePurposes(purposes);
});

function makePurposes(purposes: PurposeData[]): PurposeModel[] {
    return purposes.map((purpose) => ({
        description: purpose.name,
        detailsConstrain: purpose?.details,
        notesType: purpose?.placeholder,
    }));
}
