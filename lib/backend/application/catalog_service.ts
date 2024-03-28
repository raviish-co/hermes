import type { VariationRepository } from "../domain/catalog/variation_repository";
import type { ItemRepository } from "../domain/catalog/item_repository";
import type { Generator } from "../domain/sequences/generator";
import { ItemBuilder } from "../domain/catalog/item_builder";
import { left, right, type Either } from "../shared/either";
import { Sequence } from "../domain/sequences/sequence";
import { Variation } from "../domain/catalog/variation";
import type { Pagination } from "../shared/pagination";
import { Item } from "../domain/catalog/item";
import { Decimal } from "../shared/decimal";

export class CatalogService {
    #itemRepository: ItemRepository;
    #variationRepository: VariationRepository;
    #generator: Generator;

    constructor(
        itemRepository: ItemRepository,
        variationRepository: VariationRepository,
        generator: Generator
    ) {
        this.#itemRepository = itemRepository;
        this.#variationRepository = variationRepository;
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

    async registerItem(
        name: string,
        price: number,
        comment?: string
    ): Promise<Either<Error, void>> {
        const itemId = this.#generator.generate(Sequence.Item);

        const itemOrErr = new ItemBuilder()
            .withItemId(itemId)
            .withName(name)
            .withPrice(new Decimal(price))
            .withStock(0)
            .withCondition(comment)
            .build();

        if (itemOrErr.isLeft()) return left(itemOrErr.value);

        const item = itemOrErr.value;

        await this.#itemRepository.save(item);

        return right(undefined);
    }

    async getVariations(): Promise<Variation[]> {
        return await this.#variationRepository.getAll();
    }
}
