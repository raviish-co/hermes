import { describe, expect, it, vi } from "vitest";
import { left, right, type Either } from "../../shared/either";
import { ItemNotFound } from "../../domain/catalog/item_not_found_error";
import { ID } from "../../shared/id";
import type { ItemRepository } from "../../domain/catalog/item_repository";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import type { Item } from "../../domain/catalog/item";
import { SequenceGenerator } from "../../domain/sequences/sequence_generator";
import { Sequence } from "../../domain/sequences/sequence";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";

describe("Test Goods Receipt", () => {
    it("Deve retornar um erro **InvalidEntryDate** se a data de entrada de mercadoria não for definida", async () => {
        const { service } = makeService();

        const error = await service.new({ ...goodsReceiptData, entryDate: "" });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidEntryDate);
    });

    it("Deve retornar um erro **InvaldLines** se linhas estiver vazia", async () => {
        const { service } = makeService();

        const error = await service.new({ ...goodsReceiptData, lines: [] });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidLines);
    });

    it("Deve retornar um erro **ItemNotFound** se não existir", async () => {
        const { service } = makeService();

        const error = await service.new({
            ...goodsReceiptData,
            lines: [{ itemId: "123", quantity: 1 }],
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(ItemNotFound);
    });

    it("Deve retornar um error **InvalidLines** se não existir", async () => {
        const data = {
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const { service } = makeService();

        const error = await service.new(data as any);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidLines);
    });

    it("Deve atualizar a quantidade em stock dos artigos", async () => {
        const { service, itemRepository } = makeService();

        await service.new(goodsReceiptData);

        const item1 = await itemRepository.getById(ID.fromString("1001"));
        const item2 = await itemRepository.getById(ID.fromString("1002"));

        expect(item1.getStock().quantity).toBe(11);
        expect(item2.getStock().quantity).toBe(11);
    });

    it("Deve chamar o método **save** no repositório de entrada de mercadoria", async () => {
        const { service, goodsReceiptNoteRepository } = makeService();
        const spy = vi.spyOn(goodsReceiptNoteRepository, "save");

        await service.new(goodsReceiptData);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve efectuar a nota de entrada de mercadoria", async () => {
        const { service, goodsReceiptNoteRepository } = makeService();
        await service.new(goodsReceiptData);

        const goodsReceipt = await goodsReceiptNoteRepository.last();

        expect(goodsReceipt.goodsReceiptLines.length).toBe(2);
        expect(goodsReceipt.goodsReceiptLines[0].itemId.toString()).toBe("1001");
        expect(goodsReceipt.goodsReceiptLines[1].itemId.toString()).toBe("1002");
    });

    it("Deve gerar o ID para a nota de entrada de mercadoria", async () => {
        const { service, goodsReceiptNoteRepository } = makeService();
        await service.new(goodsReceiptData);

        const goodsReceipt = await goodsReceiptNoteRepository.last();

        expect(goodsReceipt.goodsReceiptNoteId).toBeDefined();
        expect(goodsReceipt.goodsReceiptNoteId.toString()).toBe("GE - 0001");
        expect(goodsReceipt.goodsReceiptNoteId).toBeInstanceOf(ID);
    });

    it("Deve atualizar a condição dos artigos", async () => {
        const lines = [
            { itemId: "1001", quantity: 2, condition: { status: "Bom" } },
            { itemId: "1002", quantity: 2, condition: { status: "Mau", comment: "Gola rasgada" } },
        ];
        const { service, itemRepository } = makeService();

        service.new({ ...goodsReceiptData, lines });

        const item1 = await itemRepository.getById(ID.fromString("1001"));
        const item2 = await itemRepository.getById(ID.fromString("1002"));

        expect(item1.getCondition().status).toBe("Bom");
        expect(item1.getCondition().comment).toBeUndefined();
        expect(item2.getCondition().status).toBe("Mau");
        expect(item2.getCondition().comment).toEqual("Gola rasgada");
    });
});

export class GoodsReceiptService {
    readonly #itemRepository: ItemRepository;
    readonly #goodsReceiptNoteRepository: GoodsReceiptNoteRepository;
    readonly #sequenceGenerator: SequenceGenerator;

    constructor(
        itemRepository: ItemRepository,
        goodsReceiptNoteRepository: GoodsReceiptNoteRepository,
        sequenceGenerator: SequenceGenerator
    ) {
        this.#itemRepository = itemRepository;
        this.#goodsReceiptNoteRepository = goodsReceiptNoteRepository;
        this.#sequenceGenerator = sequenceGenerator;
    }

    async new(data: GoodsReceiptDTO): Promise<Either<GoodsReceiptError, void>> {
        if (!data.entryDate) return left(new InvalidEntryDate(data.entryDate));

        if (this.#isValidLines(data)) return left(new InvalidLines());

        const itemsIds = this.#buildItemsIds(data.lines);

        const itemsOrError = await this.#itemRepository.findAll(itemsIds);
        if (itemsOrError.isLeft()) return left(itemsOrError.value);

        this.#incrementItemsStock(itemsOrError.value, data.lines);

        this.#updateItemsCondition(itemsOrError.value, data.lines);

        this.#itemRepository.updateAll(itemsOrError.value);

        const lines = this.#buildLines(itemsIds, data.lines);
        const noteId = this.#sequenceGenerator.generate(Sequence.GoodsReceiptNote);
        const noteOrErr = new GoodsReceiptBuilder()
            .withGoodsReceiptNoteId(noteId)
            .withEntryDate(data.entryDate)
            .withUser(data.userId)
            .withLines(lines)
            .build();
        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        this.#goodsReceiptNoteRepository.save(noteOrErr.value);

        return right(undefined);
    }

    #isValidLines(data: GoodsReceiptDTO) {
        return !data.lines || data.lines.length === 0;
    }

    #buildItemsIds(linesDTO: GoodsReceiptLineDTO[]): ID[] {
        return linesDTO.map((line) => ID.fromString(line.itemId));
    }

    #incrementItemsStock(items: Item[], lines: GoodsReceiptLineDTO[]) {
        items.forEach((item, idx) => item.incrementStock(lines[idx].quantity));
    }

    #buildLines(itemsIds: ID[], lines: GoodsReceiptLineDTO[]): GoodsReceiptLine[] {
        return lines.map((line, idx) => new GoodsReceiptLine(itemsIds[idx], line.quantity));
    }

    #updateItemsCondition(items: Item[], lines: GoodsReceiptLineDTO[]) {
        lines.forEach((line, idx) => {
            if (!line.condition) return;

            items[idx].updateCondition(line.condition.status, line.condition.comment);
        });
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

const makeService = () => {
    const storage = new InmemSequenceStorage();
    const sequenceGenerator = new SequenceGenerator(storage);
    const goodsReceiptNoteRepository = new InmemGoodsReceiptNoteRepository();
    const itemRepository = new ItemRepositoryStub();
    const service = new GoodsReceiptService(
        itemRepository,
        goodsReceiptNoteRepository,
        sequenceGenerator
    );

    return { service, goodsReceiptNoteRepository, itemRepository };
};

const goodsReceiptData = {
    lines: [
        { itemId: "1001", quantity: 1 },
        { itemId: "1002", quantity: 1 },
    ],
    entryDate: "2024-03-01T16:40:00",
    userId: "1000",
};
