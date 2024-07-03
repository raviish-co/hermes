import { useCatalogService } from "~/composables/useCatalogService";
import { Section } from "~/lib/backend/domain/catalog/departments/section";

const service = useCatalogService();

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
    const sections = await service.listSections();
    return sections.map(toSectionDTO);
});
