import { makeServices } from "@backend/main";

const { purposeService } = makeServices();

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
    const specs = await purposeService.listPurposeSpecifications();
    return specs.map(toPurposeDTO);
});
