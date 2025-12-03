import { _sectionsData } from "~~/server/backend/tests/stubs/section_repository_stub";
import { prismaClient } from "../prisma/prisma_client";
import { PostgresSectionRepository } from "../postgres_section_repository";
import { Section } from "~~/server/backend/domain/catalog/departments/section";

(async function () {
    const sectionsCategoriesRepositopry = new PostgresSectionRepository(prismaClient);

    const mappedValues = _sectionsData.map(async (section) => {
        const _section = new Section(section.id, section.name, section.departmentId);
        await sectionsCategoriesRepositopry.save(_section);
    });

    Promise.all(mappedValues);
    console.log("Sections added successfully");
})();
