import { CategoryAlreadyExists } from "../domain/catalog/categories/category_already_exists_error";
import type { VariationNotFound } from "../domain/catalog/variations/variation_not_found_error";
import type { VariationRepository } from "../domain/catalog/variations/variation_repository";
import type { CategoryRepository } from "../domain/catalog/categories/category_repository";
import type { SectionNotFound } from "../domain/catalog/departments/section_not_found_error";
import type { SectionRepository } from "../domain/catalog/departments/section_repository";
import type { RegisterCategoryError, RegisterItemError } from "../shared/errors";
import type { ItemRepository } from "../domain/catalog/items/item_repository";
import { Variation } from "../domain/catalog/variations/variation";
import { ItemBuilder } from "../domain/catalog/items/item_builder";
import type { Section } from "../domain/catalog/departments/section";
import type { Generator } from "../adapters/sequences/generator";
import { Category } from "../domain/catalog/categories/category";
import { left, right, type Either } from "../shared/either";
import { Sequence } from "../adapters/sequences/sequence";
import type { Pagination } from "../shared/pagination";
import { Item } from "../domain/catalog/items/item";
import { Decimal } from "../shared/decimal";
import { ID } from "../shared/id";

export class CatalogService {
    #itemRepository: ItemRepository;
    #categoryRepository: CategoryRepository;
    #variationRepository: VariationRepository;
    #sectionRepository: SectionRepository;
    #generator: Generator;

    constructor(
        itemRepository: ItemRepository,
        variationRepository: VariationRepository,
        categoryRepository: CategoryRepository,
        sectionRepository: SectionRepository,
        generator: Generator
    ) {
        this.#itemRepository = itemRepository;
        this.#variationRepository = variationRepository;
        this.#categoryRepository = categoryRepository;
        this.#sectionRepository = sectionRepository;
        this.#generator = generator;
    }

    async listItems(pageToken: number = 1, perPage: number = 12): Promise<Pagination<Item>> {
        return await this.#itemRepository.list(pageToken, perPage);
    }

    async listCategories(): Promise<Category[]> {
        return await this.#categoryRepository.getAll();
    }

    async listVariations(): Promise<Variation[]> {
        return await this.#variationRepository.getAll();
    }

    async listSections(): Promise<Section[]> {
        return await this.#sectionRepository.getAll();
    }

    async searchItems(
        query: string,
        pageToken: number = 1,
        perPage: number = 12
    ): Promise<Pagination<Item>> {
        return await this.#itemRepository.search(query, pageToken, perPage);
    }

    async registerItem(data: RegisterItemDTO): Promise<Either<RegisterItemError, void>> {
        const itemId = this.#generator.generate(Sequence.Item);

        const sectionOrErr = await this.#verifySectionId(data.sectionId);
        if (sectionOrErr.isLeft()) return left(sectionOrErr.value);

        const variationsIds = data.variations?.map((v) => ID.fromString(v.variationId));
        const voidOrErr = await this.#verifyVariationsIds(variationsIds);
        if (voidOrErr.isLeft()) return left(voidOrErr.value);

        const variationsValues = this.#buildVariationsValues(data.variations);
        const itemOrErr = new ItemBuilder()
            .withItemId(itemId)
            .withName(data.name)
            .withPrice(new Decimal(data.price))
            .withStock(0)
            .withCategoryId(data.categoryId)
            .withSectionId(data.sectionId)
            .withVariationsValues(variationsValues)
            .withCondition(data.comment)
            .withTags(data.tags)
            .build();

        if (itemOrErr.isLeft()) return left(itemOrErr.value);

        const item = itemOrErr.value;

        await this.#itemRepository.save(item);

        return right(undefined);
    }

    async registerCategory(
        name: string,
        variations?: string[]
    ): Promise<Either<RegisterCategoryError, void>> {
        const exists = await this.#categoryRepository.exists(name);

        if (exists) return left(new CategoryAlreadyExists());

        const variationsIds = this.#buildVariationsIds(variations);

        const voidOrErr = await this.#verifyVariationsIds(variationsIds);

        if (voidOrErr.isLeft()) return left(voidOrErr.value);

        const categoryId = this.#generator.generate(Sequence.Category);

        const category = new Category(ID.fromString(categoryId), name, variationsIds);

        await this.#categoryRepository.save(category);

        return right(undefined);
    }

    async #verifyVariationsIds(variationsIds?: ID[]): Promise<Either<VariationNotFound, void>> {
        if (!variationsIds) return right(undefined);

        const variations = await this.#variationRepository.vertifyIds(variationsIds);

        if (variations.isLeft()) return left(variations.value);

        return right(undefined);
    }

    async #verifySectionId(sectionId?: string): Promise<Either<SectionNotFound, void>> {
        if (!sectionId) return right(undefined);

        const section = await this.#sectionRepository.findById(ID.fromString(sectionId));

        if (section.isLeft()) return left(section.value);

        return right(undefined);
    }

    #buildVariationsIds(variations?: string[]) {
        if (!variations) return;

        return variations.map(ID.fromString);
    }

    #buildVariationsValues(data?: VariationDTO[]): Record<string, string> {
        if (!data) return {};

        const variations: Record<string, string> = {};
        for (const variation of data) {
            variations[variation.variationId] = `${variation.name}: ${variation.value}`;
        }

        return variations;
    }
}

type RegisterItemDTO = {
    name: string;
    price: number;
    categoryId?: string;
    sectionId?: string;
    variations?: VariationDTO[];
    comment?: string;
    tags?: string[];
};

type VariationDTO = {
    variationId: string;
    name: string;
    value: string;
};
