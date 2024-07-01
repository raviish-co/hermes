import { ImportService } from "~/lib/backend/application/import_service";
import { useCategoryRepository } from "~/composables/useCategoryRepository";
import { useCsvReader } from "~/composables/useCsvReader";
import { useGoodsReceiptRepository } from "~/composables/useGoodsReceiptRepository";
import { useItemRepository } from "~/composables/useItemRepository";
import { useItemStockRepository } from "~/composables/useItemStockRepository";
import { useSectionRepository } from "~/composables/useSectionRepository";
import { useSequenceGenerator } from "~/composables/useSequenceGenerator";
import { useVariationRepository } from "~/composables/useVariationRepository";

const srv = new ImportService(
    useItemRepository(),
    useItemStockRepository(),
    useCategoryRepository(),
    useSectionRepository(),
    useVariationRepository(),
    useGoodsReceiptRepository(),
    useSequenceGenerator(),
    useCsvReader()
);

export const useImportService = () => srv;
