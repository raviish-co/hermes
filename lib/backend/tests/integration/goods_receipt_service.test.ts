import { describe, expect, it } from "vitest";
import { left, type Either } from "../../shared/either";
import { ItemNotFound } from "../../domain/catalog/item_not_found_error";
import { ID } from "../../shared/id";
import type { ItemRepository } from "../../domain/catalog/item_repository";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";

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

    it("Deve retornar um erro **EmptyLines** se as linhas não forem definidos", async () => {
        const data = {
            lines: [],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const itemRepository = new ItemRepositoryStub();
        const service = new GoodsReceiptService(itemRepository);

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(EmptyLines);
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
});

export class GoodsReceiptService {
    readonly #itemRepository: ItemRepository;

    constructor(itemRepository: ItemRepository) {
        this.#itemRepository = itemRepository;
    }

    async new(data: GoodsReceiptDTO) {
        const entryDate = data.entryDate;
        if (!entryDate) return left(new InvalidEntryDate(data.entryDate));

        if (!data.lines) return left(new InvalidLines());
        if (data.lines.length === 0) return left(new EmptyLines());

        const itemsIds = this.#buildItemsIds(data.lines);
        const itemsOrError = await this.#itemRepository.findAll(itemsIds);
        if (itemsOrError.isLeft()) return left(itemsOrError.value);

        return {} as Promise<Either<any, any>>;
    }

    #buildItemsIds(lines: GoodsReceiptLineDTO[]): ID[] {
        return lines.map((line) => ID.fromString(line.itemId));
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
export class EmptyLines extends Error {
    constructor() {
        super(`Lines is empty`);
    }
}

export class InvalidLines extends Error {
    constructor() {
        super(`Lines is invalid`);
    }
}
