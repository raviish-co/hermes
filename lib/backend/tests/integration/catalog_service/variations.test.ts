import { describe, expect, it } from "vitest";
import { Variation } from "../../../domain/catalog/variations/variation";
import { InmemVariationRepository } from "../../../persistence/inmem/inmem_variation_repository";
import { ID } from "../../../shared/id";
import { CategoryRepositoryStub } from "../../stubs/category_repository_stub";
import { ItemRepositoryStub } from "../../stubs/item_repository_stub";
import { catalogService } from "./service";

describe("CatalogService - Recuperar todas as variações", () => {
    it("Deve recuperar as variações da base de dados", async () => {
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        variationRepository.save(variation);

        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({
            categoryRepository,
            itemRepository,
            variationRepository,
        });

        const variations = await service.listVariations();

        expect(variations.length).toBeGreaterThanOrEqual(1);
    });
});

export const variation = new Variation(ID.fromString("1"), "Cor", ["Preto", "Branco", "Vermelho"]);
