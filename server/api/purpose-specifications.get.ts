import { makeServices } from "@backend/main";

const { purposeService } = makeServices();

interface PurposeDTO {
    description: string;
    detailsConstraints: string[];
    notesType: string;
}

function toPurposeDTO(p: any): PurposeDTO {
    return {
        description: p.description,
        detailsConstraints: p.detailsConstraints,
        notesType: p.notesType,
    };
}

export default defineEventHandler(async () => {
    const specs = await purposeService.listPurposeSpecifications();
    return specs.map(toPurposeDTO);
});
