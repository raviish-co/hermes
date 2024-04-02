import { Section } from "~/lib/backend/domain/catalog/departments/section";
import { makeServices } from "~/lib/backend/main";

const { catalogService } = makeServices();

interface SectionDTO {
    sectionId: string;
    departmentId: string;
    name: string;
}

function toSectionDTO(section: Section): SectionDTO {
    return {
        sectionId: section.sectionId.toString(),
        departmentId: section.departmentId.toString(),
        name: section.name,
    };
}

export default defineEventHandler(async (event) => {
    const sections = await catalogService.listSections();
    return sections.map(toSectionDTO);
});
