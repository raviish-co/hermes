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

    it("Deve efectuar a nota de entrada de mercadoria", async () => {
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

        const goodsReceipt = await goodsReceiptNoteRepository.last();

        expect(goodsReceipt.goodsReceiptLines.length).toBe(2);
        expect(goodsReceipt.goodsReceiptLines[0].itemId.toString()).toBe("1001");
        expect(goodsReceipt.goodsReceiptLines[1].itemId.toString()).toBe("1002");
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

        const lines = this.#buildLines(itemsIds, data.lines);
        const noteId = "xpto";
        const noteOrError = new GoodsReceiptBuilder()
            .withGoodsReceiptNoteId(noteId)
            .withEntryDate(entryDate)
            .withUser(data.userId)
            .withLines(lines)
            .build();
        if (noteOrError.isLeft()) return left(noteOrError.value);

        this.#goodsReceiptNoteRepository.save(noteOrError.value);

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

    #buildLines(itemsIds: ID[], lines: GoodsReceiptLineDTO[]): GoodsReceiptLine[] {
        return lines.map((line, idx) => new GoodsReceiptLine(itemsIds[idx], line.quantity));
    }
}

export class GoodsReceiptLine {
    readonly itemId: ID;
    readonly quantity: number;

    constructor(itemId: ID, quantity: number) {
        this.itemId = itemId;
        this.quantity = quantity;
    }
}

export class GoodsReceiptNote {
    readonly goodsReceiptNoteId: ID;
    readonly entryDate: Date;
    readonly userId: ID;
    readonly goodsReceiptLines: GoodsReceiptLine[];

    constructor(noteId: ID, entryDate: Date, userId: ID, goodsReceiptLines: GoodsReceiptLine[]) {
        this.goodsReceiptNoteId = noteId;
        this.entryDate = entryDate;
        this.userId = userId;
        this.goodsReceiptLines = goodsReceiptLines;
    }
}

export class GoodsReceiptBuilder {
    #goodsReceiptNoteId?: ID;
    #entryDate?: Date;
    #userId?: ID;
    #lines: GoodsReceiptLine[] = [];

    withGoodsReceiptNoteId(noteId: string) {
        this.#goodsReceiptNoteId = ID.fromString(noteId);
        return this;
    }

    withEntryDate(entryDate: string) {
        this.#entryDate = new Date(entryDate);
        return this;
    }

    withUser(userId: string) {
        this.#userId = ID.fromString(userId);
        return this;
    }

    withLines(lines: GoodsReceiptLine[]) {
        this.#lines = lines;
        return this;
    }

    build(): Either<Error, GoodsReceiptNote> {
        if (!this.#goodsReceiptNoteId) return left(new Error("goodsReceiptId is required"));

        if (!this.#entryDate) return left(new Error("entryDate is required"));

        if (!this.#userId) return left(new Error("userId is required"));

        const goodsReceipt = new GoodsReceiptNote(
            this.#goodsReceiptNoteId,
            this.#entryDate,
            this.#userId,
            this.#lines
        );

        return right(goodsReceipt);
    }
}

export interface GoodsReceiptNoteRepository {
    save(goodsReceipt: GoodsReceiptNote): Promise<void>;
    last(): Promise<GoodsReceiptNote>;
}

export class InmemGoodsReceiptNoteRepository implements GoodsReceiptNoteRepository {
    #goodsReceipts: Record<string, GoodsReceiptNote> = {};

    save(goodsReceipt: GoodsReceiptNote): Promise<void> {
        this.#goodsReceipts[goodsReceipt.goodsReceiptNoteId.toString()] = goodsReceipt;
        return Promise.resolve(undefined);
    }

    last(): Promise<GoodsReceiptNote> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): GoodsReceiptNote[] {
        return Object.values(this.#goodsReceipts);
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
