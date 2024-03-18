import { describe, expect, it } from "vitest";
import { left, right, type Either } from "../../shared/either";
import { ItemNotFound } from "../../domain/catalog/item_not_found_error";
import { ID } from "../../shared/id";
import type { ItemRepository } from "../../domain/catalog/item_repository";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import type { Item } from "../../domain/catalog/item";

describe("Test Goods Receipt", () => {
    it("Deve retornar um erro **InvalidEntryDate** se a data de entrada de mercadoria não for definida", async () => {
        const data = {
            lines: [
                {
                    itemId: "RVS - 0001",
                    quantity: 1,
                    condition: { status: "Bom" },
                },
            ],
            entryDate: "",
            userId: "1000",
        };
        const itemRepository = new ItemRepositoryStub();
        const service = new GoodsReceiptService(itemRepository);

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidEntryDate);
    });

    it("Deve retornar um erro **InvaldLines** se as linhas não forem definidos", async () => {
        const data = {
            lines: [],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const itemRepository = new ItemRepositoryStub();
        const service = new GoodsReceiptService(itemRepository);

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidLines);
    });

    it("Deve retornar um erro **ItemNotFound** se não existir", async () => {
        const data = {
            lines: [{ itemId: "123", quantity: 1 }],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const itemRepository = new ItemRepositoryStub();
        const service = new GoodsReceiptService(itemRepository);

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(ItemNotFound);
    });

    it("Deve retornar um error **InvalidLines** se não existir", async () => {
        const data = {
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const itemRepository = new ItemRepositoryStub();
        const service = new GoodsReceiptService(itemRepository);

        const error = await service.new(data as any);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidLines);
    });

    it("Deve atualizar a quantidade em stock dos artigos", async () => {
        const data = {
            lines: [
                { itemId: "1001", quantity: 1 },
                { itemId: "1002", quantity: 1 },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const itemRepository = new ItemRepositoryStub();
        const service = new GoodsReceiptService(itemRepository);

        await service.new(data);

        const item1 = await itemRepository.getById(ID.fromString("1001"));
        const item2 = await itemRepository.getById(ID.fromString("1002"));

        expect(item1.getStock().quantity).toBe(11);
        expect(item2.getStock().quantity).toBe(11);
    });
});

export class GoodsReceiptService {
    readonly #itemRepository: ItemRepository;

    constructor(itemRepository: ItemRepository) {
        this.#itemRepository = itemRepository;
    }

    async new(data: GoodsReceiptDTO): Promise<Either<GoodsReceiptError, void>> {
        const entryDate = data.entryDate;
        if (!entryDate) return left(new InvalidEntryDate(data.entryDate));

        if (!data.lines || data.lines.length === 0) {
            return left(new InvalidLines());
        }

        const itemsIds = this.#buildItemsIds(data.lines);
        const itemsOrError = await this.#itemRepository.findAll(itemsIds);
        if (itemsOrError.isLeft()) return left(itemsOrError.value);

        this.#incrementItemsStock(itemsOrError.value, data);
        this.#itemRepository.updateAll(itemsOrError.value);

        return right(undefined);
    }

    #buildItemsIds(lines: GoodsReceiptLineDTO[]): ID[] {
        return lines.map((line) => ID.fromString(line.itemId));
    }

    #incrementItemsStock(items: Item[], data: GoodsReceiptDTO) {
        items.forEach((item, idx) => {
            item.incrementStock(data.lines[idx].quantity);
        });
    }
}

type GoodsReceiptDTO = {
    lines: GoodsReceiptLineDTO[];
    userId: string;
    entryDate: string;
};

type GoodsReceiptLineDTO = {
    itemId: string;
    quantity: number;
    condition?: Condition;
};

type Condition = {
    status: string;
    comment?: string;
};

export class InvalidEntryDate extends Error {
    constructor(name: string) {
        super(`Entry date ${name} is invalid`);
    }
}

export class InvalidLines extends Error {
    constructor() {
        super(`Lines is invalid`);
    }
}

export type GoodsReceiptError = InvalidEntryDate | InvalidLines | ItemNotFound;
