import { describe, it, expect } from "vitest";
import { SectionRepositoryStub } from "../../stubs/section_repository_stub";
import { catalogService } from "../services";

describe("CatalogService - Recuperar todas as secções", () => {
    it("Deve recuperar as secções do repositório", async () => {
        const sectionRepository = new SectionRepositoryStub();
        const { service } = catalogService({ sectionRepository });

        const sections = await service.listSections();

        expect(sections.length).toBeGreaterThanOrEqual(1);
    });
});
