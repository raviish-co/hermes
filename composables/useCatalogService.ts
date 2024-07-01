import { CatalogService } from "~/lib/backend/application/catalog_service";

import { useCategoryRepository } from "~/composables/useCategoryRepository";
import { useItemRepository } from "~/composables/useItemRepository";
import { useSectionRepository } from "~/composables/useSectionRepository";
import { useSequenceGenerator } from "~/composables/useSequenceGenerator";
import { useVariationRepository } from "~/composables/useVariationRepository";

const srv = new CatalogService(
    useItemRepository(),
    useVariationRepository(),
    useCategoryRepository(),
    useSectionRepository(),
    useSequenceGenerator()
);

export const useCatalogService = () => srv;
