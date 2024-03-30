import type { VariationRepository } from "../domain/catalog/variations/variation_repository";
import type { CategoryRepository } from "../domain/catalog/categories/category_repository";
import { InvalidVariations } from "../domain/catalog/variations/invalid_variations_error";
import type { ItemRepository } from "../domain/catalog/items/item_repository";
import type { Generator } from "../adapters/sequences/generator";
import { ItemBuilder } from "../domain/catalog/items/item_builder";
import { left, right, type Either } from "../shared/either";
import { Sequence } from "../adapters/sequences/sequence";
import { Variation } from "../domain/catalog/variations/variation";
import type { Pagination } from "../shared/pagination";
import { Item } from "../domain/catalog/items/item";
import { Decimal } from "../shared/decimal";

export class CatalogService {
    #itemRepository: ItemRepository;
    #variationRepository: VariationRepository;
    #categoryRepository: CategoryRepository;
    #generator: Generator;

    constructor(
        itemRepository: ItemRepository,
        variationRepository: VariationRepository,
        categoryRepository: CategoryRepository,
        generator: Generator
    ) {
        this.#itemRepository = itemRepository;
        this.#variationRepository = variationRepository;
        this.#categoryRepository = categoryRepository;
        this.#generator = generator;
    }

    async listItems(pageToken: number = 1, perPage: number = 12): Promise<Pagination<Item>> {
        return await this.#itemRepository.list(pageToken, perPage);
    }

    async searchItems(
        query: string,
        pageToken: number = 1,
        perPage: number = 12
    ): Promise<Pagination<Item>> {
        return await this.#itemRepository.search(query, pageToken, perPage);
    }

    async registerItem(data: RegisterItemDTO): Promise<Either<Error, void>> {
        const itemId = this.#generator.generate(Sequence.Item);

        if (this.#isInvalidCategory(data)) return left(new InvalidVariations());

        const variationsValues = this.#buildVariationsValues(data.variations);
        const itemOrErr = new ItemBuilder()
            .withItemId(itemId)
            .withName(data.name)
            .withPrice(new Decimal(data.price))
            .withStock(0)
            .withCondition(data.comment)
            .withCategoryId(data.categoryId)
            .withVariationsValues(variationsValues)
            .build();

        if (itemOrErr.isLeft()) return left(itemOrErr.value);

        const item = itemOrErr.value;

        await this.#itemRepository.save(item);

        return right(undefined);
    }

    async getVariations(): Promise<Variation[]> {
        return await this.#variationRepository.getAll();
    }

    #isInvalidCategory(data: RegisterItemDTO) {
        return data.categoryId && !data.variations;
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
    comment?: string;
    categoryId?: string;
    variations?: VariationDTO[];
};

type VariationDTO = {
    variationId: string;
    name: string;
    value: string;
};
