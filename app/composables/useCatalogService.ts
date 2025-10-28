import { CatalogService } from "@backend/application/catalog_service";
import { useCategoryRepository } from "@app/composables/useCategoryRepository";
import { useItemRepository } from "@app/composables/useItemRepository";
import { useSectionRepository } from "@app/composables/useSectionRepository";
import { useSequenceGenerator } from "@app/composables/useSequenceGenerator";
import { useVariationRepository } from "@app/composables/useVariationRepository";

const srv = new CatalogService(
    useItemRepository(),
    useVariationRepository(),
    useCategoryRepository(),
    useSectionRepository(),
    useSequenceGenerator()
);

export const useCatalogService = () => srv;
