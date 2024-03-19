import { describe, expect, it, vi } from "vitest";
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
        const goodsReceiptNoteRepository = new InmemGoodsReceiptNoteRepository();
        const itemRepository = new ItemRepositoryStub();
        const service = new GoodsReceiptService(itemRepository, goodsReceiptNoteRepository);

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidEntryDate);
    });

    it("Deve retornar um erro **InvaldLines** se linhas estiver vazia", async () => {
        const data = {
            lines: [],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const goodsReceiptNoteRepository = new InmemGoodsReceiptNoteRepository();
        const itemRepository = new ItemRepositoryStub();
        const service = new GoodsReceiptService(itemRepository, goodsReceiptNoteRepository);

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
        const goodsReceiptNoteRepository = new InmemGoodsReceiptNoteRepository();
        const itemRepository = new ItemRepositoryStub();
        const service = new GoodsReceiptService(itemRepository, goodsReceiptNoteRepository);

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(ItemNotFound);
    });

    it("Deve retornar um error **InvalidLines** se não existir", async () => {
        const data = {
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const goodsReceiptNoteRepository = new InmemGoodsReceiptNoteRepository();
        const itemRepository = new ItemRepositoryStub();
        const service = new GoodsReceiptService(itemRepository, goodsReceiptNoteRepository);

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
        const goodsReceiptNoteRepository = new InmemGoodsReceiptNoteRepository();
        const itemRepository = new ItemRepositoryStub();
        const service = new GoodsReceiptService(itemRepository, goodsReceiptNoteRepository);

        await service.new(data);

        const item1 = await itemRepository.getById(ID.fromString("1001"));
        const item2 = await itemRepository.getById(ID.fromString("1002"));

        expect(item1.getStock().quantity).toBe(11);
        expect(item2.getStock().quantity).toBe(11);
    });

    it("Deve chamar o método **save** no repositório de entrada de mercadoria", async () => {
        const data = {
            lines: [
                { itemId: "1001", quantity: 1 },
                { itemId: "1002", quantity: 1 },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const goodsReceiptNoteRepository = new InmemGoodsReceiptNoteRepository();
        const spy = vi.spyOn(goodsReceiptNoteRepository, "save");
        const itemRepository = new ItemRepositoryStub();
        const service = new GoodsReceiptService(itemRepository, goodsReceiptNoteRepository);

        await service.new(data);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

export class GoodsReceiptService {
    readonly #itemRepository: ItemRepository;
    readonly #goodsReceiptNoteRepository: GoodsReceiptNoteRepository;

    constructor(
        itemRepository: ItemRepository,
        goodsReceiptNoteRepository: GoodsReceiptNoteRepository
    ) {
        this.#itemRepository = itemRepository;
        this.#goodsReceiptNoteRepository = goodsReceiptNoteRepository;
    }

    async new(data: GoodsReceiptDTO): Promise<Either<GoodsReceiptError, void>> {
        const entryDate = data.entryDate;
        if (!entryDate) return left(new InvalidEntryDate(entryDate));

        if (!data.lines || data.lines.length === 0) {
            return left(new InvalidLines());
        }

        const itemsIds = this.#buildItemsIds(data.lines);
        const itemsOrError = await this.#itemRepository.findAll(itemsIds);
        if (itemsOrError.isLeft()) return left(itemsOrError.value);

        this.#incrementItemsStock(itemsOrError.value, data.lines);
        this.#itemRepository.updateAll(itemsOrError.value);

        const note = new GoodsReceiptNote();

        this.#goodsReceiptNoteRepository.save(note);

        return right(undefined);
    }

    #buildItemsIds(lines: GoodsReceiptLineDTO[]): ID[] {
        return lines.map((line) => ID.fromString(line.itemId));
    }

    #incrementItemsStock(items: Item[], lines: GoodsReceiptLineDTO[]) {
        items.forEach((item, idx) => {
            item.incrementStock(lines[idx].quantity);
        });
    }
}

export class GoodsReceiptNote {}

export interface GoodsReceiptNoteRepository {
    save(goodsReceipt: GoodsReceiptNote): Promise<void>;
}

export class InmemGoodsReceiptNoteRepository implements GoodsReceiptNoteRepository {
    save(goodsReceipt: GoodsReceiptNote): Promise<void> {
        return Promise.resolve(undefined);
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
