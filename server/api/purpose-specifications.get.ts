import { usePurposeService } from "~/composables/usePurposeService";

const service = usePurposeService();

interface PurposeDTO {
    description: string;
    detailsConstraint: string[];
    notesType: string;
}

function toPurposeDTO(p: any): PurposeDTO {
    return {
        description: p.description,
        detailsConstraint: p.detailsConstraint,
        notesType: p.notesType,
    };
}

export default defineEventHandler(async () => {
    const specs = await service.listPurposeSpecifications();
    return specs.map(toPurposeDTO);
});
