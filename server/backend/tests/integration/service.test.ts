import { describe, expect, it, vi } from "vitest";
import { FakePurposeSource } from "../purpose_source_fake";
import { PurposeSourceStub } from "../purpose_source_stub";
import { Service } from "../../application/service";

describe("Test main Service", () => {
    it("should be return an  list void of purposes", async () => {
        const reader = new FakePurposeSource();
        const service = new Service(reader);

        const purposes = await service.listPurposes();

        expect(purposes).toEqual([]);
    });

    it("should be call list method in source data", async () => {
        const reader = new FakePurposeSource();
        const spy = vi.spyOn(reader, "list");
        const service = new Service(reader);

        await service.listPurposes();

        expect(spy).toHaveBeenCalled();
    });

    it("should retrieve a list of purposes from data", async () => {
        const reader = new PurposeSourceStub();
        const service = new Service(reader);

        const purposes = await service.listPurposes();

        expect(purposes.length).toBeGreaterThanOrEqual(1);
        expect(purposes[0].name).toEqual("Lavandaria");
        expect(purposes[0].sections).toEqual(["Interna", "Externa"]);
    });

    it("should retrieve a purpose without sections", async () => {
        const reader = new PurposeSourceStub();
        const service = new Service(reader);

        const purposes = await service.listPurposes();

        expect(purposes.length).toBeGreaterThanOrEqual(2);
        expect(purposes[1].name).toEqual("Arranjo");
        expect(purposes[1].sections).toBeUndefined();
    });
});
