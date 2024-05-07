import { InmemVariationRepository } from "../../../persistense/inmem/inmem_variation_repository";
import { InmemItemRepository } from "../../../persistense/inmem/inmem_item_repository";
import { CatalogService } from "../../../application/catalog_service";
import { SequenceGenerator } from "../../../adapters/sequences/sequence_generator";
import { InmemSequenceStorage } from "../../../persistense/inmem/inmem_sequence_storage";
import { InmemCategoryRepository } from "../../../persistense/inmem/inmem_category_repository";
import { InmemSectionRepository } from "../../../persistense/inmem/inmem_section_repository";
import type { ItemRepository } from "../../../domain/catalog/items/item_repository";
import type { VariationRepository } from "../../../domain/catalog/variations/variation_repository";
import type { CategoryRepository } from "../../../domain/catalog/categories/category_repository";
import type { SectionRepository } from "../../../domain/catalog/departments/section_repository";
import { ItemStockRepositoryStub } from "../../stubs/item_stock_repository_stub";

interface Dependecies {
    itemRepository?: ItemRepository;
    variationRepository?: VariationRepository;
    categoryRepository?: CategoryRepository;
    sectionRepository?: SectionRepository;
}

export function catalogService(deps?: Dependecies) {
    const storage = new InmemSequenceStorage();
    const generator = new SequenceGenerator(storage, 1000);
    const itemRepository = deps?.itemRepository ?? new InmemItemRepository();
    const itemStockRepository = new ItemStockRepositoryStub();
    const variationRepository = deps?.variationRepository ?? new InmemVariationRepository();
    const categoryRepository = deps?.categoryRepository ?? new InmemCategoryRepository();
    const sectionRepository = deps?.sectionRepository ?? new InmemSectionRepository();

    const service = new CatalogService(
        itemRepository,
        itemStockRepository,
        variationRepository,
        categoryRepository,
        sectionRepository,
        generator
    );

    return {
        service,
        itemRepository,
        variationRepository,
        categoryRepository,
        sectionRepository,
        itemStockRepository,
    };
}
