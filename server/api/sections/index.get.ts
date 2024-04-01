import { Section } from "~/lib/backend/domain/catalog/sections/section";
import { makeServices } from "~/lib/backend/main";

const { catalogService } = makeServices();

interface SectionDTO {
    sectionId: string;
    categoryId: string;
    name: string;
}

function toSectionDTO(section: Section): SectionDTO {
    return {
        sectionId: section.sectionId.toString(),
        categoryId: section.categoryId.toString(),
        name: section.name,
    };
}

export default defineEventHandler(async (event) => {
    const sections = await catalogService.listSections();
    return sections.map(toSectionDTO);
});
