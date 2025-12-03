import { ImportService } from "@backend/application/import_service";
import { useCategoryRepository } from "@app/composables/useCategoryRepository";
import { useCsvReader } from "@app/composables/useCsvReader";
import { useGoodsReceiptRepository } from "@app/composables/useGoodsReceiptRepository";
import { useItemRepository } from "@app/composables/useItemRepository";
import { useItemStockRepository } from "@app/composables/useItemStockRepository";
import { useSectionRepository } from "@app/composables/useSectionRepository";
import { useSequenceGenerator } from "@app/composables/useSequenceGenerator";
import { useVariationRepository } from "@app/composables/useVariationRepository";
import { useUserRepository } from "@app/composables/useUserRepository";

const srv = new ImportService(
    useItemRepository(),
    useItemStockRepository(),
    useCategoryRepository(),
    useSectionRepository(),
    useVariationRepository(),
    useGoodsReceiptRepository(),
    useSequenceGenerator(),
    useCsvReader(),
    useUserRepository()
);

export const useImportService = () => srv;
