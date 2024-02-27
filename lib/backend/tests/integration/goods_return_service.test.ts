import type { GoodsIssueRepository } from "../../domain/goods_issue/goods_issue_note_repository";
import { GoodsIssueNoteNotFound } from "../../domain/goods_issue/GoodsIssueNoteNotFound";
import { GoodsIssueRepositoryStub } from "../stubs/goods_issue_repository_stub";
import { left, right, type Either } from "../../shared/either";
import { describe, expect, it } from "vitest";
import { ID } from "../../shared/id";
import { Decimal } from "../../shared/decimal";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import type { ItemRepository } from "../../domain/catalog/item_repository";
import type { GoodsIssueLine } from "../../domain/goods_issue/goods_issue_line";
import type { Item } from "../../domain/catalog/item";

export class GoodsReturnService {
    #goodsReturnsNoteRepository: GoodsReturnNoteRepository;
    #goodsIssueRepository: GoodsIssueRepository;
    #itemRepository: ItemRepository;

    constructor(
        repository: GoodsReturnNoteRepository,
        goodsIssueRepository: GoodsIssueRepository,
        itemRepository: ItemRepository
    ) {
        this.#goodsReturnsNoteRepository = repository;
        this.#goodsIssueRepository = goodsIssueRepository;
        this.#itemRepository = itemRepository;
    }

    async returningGoods(
        noteId: string,
        securityDeposit: string
    ): Promise<Either<GoodsIssueNoteNotFound, void>> {
        const goosIssueNoteOrErr = await this.#goodsIssueRepository.get(ID.fromString(noteId));
        if (goosIssueNoteOrErr.isLeft()) return left(goosIssueNoteOrErr.value);

        const lines = goosIssueNoteOrErr.value.goodsIssueLines;
        const itemsIds = this.#getItemsIds(lines);
        const itemsOrErr = await this.#itemRepository.findAll(itemsIds);
        const items = <Item[]>itemsOrErr.value;

        this.#restoreQuantities(items, lines);

        const goodsReturnNote = new GoodsReturnsNote(
            goosIssueNoteOrErr.value.goodsIssueNoteId,
            securityDeposit
        );

        await this.#goodsReturnsNoteRepository.save(goodsReturnNote);

        await this.#itemRepository.saveAll(items);

        return right(undefined);
    }

    #restoreQuantities(items: Item[], lines: GoodsIssueLine[]) {
        for (const item of items) {
            const line = lines.find((l) => l.itemId.toString() === item.itemId.toString());
            item.updateStock(line!.quantity);
        }
    }

    #getItemsIds(lines: GoodsIssueLine[]): ID[] {
        return lines.map((l) => l.itemId);
    }
}

export class GoodsReturnsNote {
    readonly goodsReturnNoteId: ID;
    readonly goodsIssueNoteId: ID;
    readonly securityDeposit: Decimal;

    constructor(goodsIssueNoteId: ID, securityDeposit: string) {
        this.goodsReturnNoteId = ID.random();
        this.goodsIssueNoteId = goodsIssueNoteId;
        this.securityDeposit = Decimal.fromString(securityDeposit);
    }
}

export interface GoodsReturnNoteRepository {
    save(note: GoodsReturnsNote): Promise<void>;
    last(): Promise<GoodsReturnsNote>;
}

export class InmemGoodsReturnsNoteRepository implements GoodsReturnNoteRepository {
    #notes: Record<string, GoodsReturnsNote> = {};

    save(note: GoodsReturnsNote): Promise<void> {
        this.#notes[note.goodsReturnNoteId.toString()] = note;
        return Promise.resolve(undefined);
    }

    last(): Promise<GoodsReturnsNote> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): GoodsReturnsNote[] {
        return Object.values(this.#notes);
    }
}

describe("GoodsReturnService", () => {
    it("Deve efetuar a devolução de um conjunto de artigos", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemRepository = new ItemRepositoryStub();
        const goodsIssueRepository = new GoodsIssueRepositoryStub();

        const repository = new InmemGoodsReturnsNoteRepository();
        const service = new GoodsReturnService(repository, goodsIssueRepository, itemRepository);

        await service.returningGoods(goodsIssueNoteId, securityDeposit);

        const note = await repository.last();

        expect(note.goodsReturnNoteId).toBeDefined();
        expect(note.goodsIssueNoteId.toString()).toBe(goodsIssueNoteId);
    });

    it("Deve retornar o erro **GoodsIssueNoteNotFound** se a nota de saída não for encontrada", async () => {
        const goodsIssueNoteId = "GS - 0001";
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const repository = new InmemGoodsReturnsNoteRepository();
        const itemRepository = new ItemRepositoryStub();
        const service = new GoodsReturnService(repository, goodsIssueRepository, itemRepository);

        const error = await service.returningGoods(goodsIssueNoteId, securityDeposit);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(GoodsIssueNoteNotFound);
    });

    it("Deve registrar o valor da calção a reter na nota de devolução", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const repository = new InmemGoodsReturnsNoteRepository();
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const itemRepository = new ItemRepositoryStub();

        const service = new GoodsReturnService(repository, goodsIssueRepository, itemRepository);

        await service.returningGoods(goodsIssueNoteId, securityDeposit);

        const note = await repository.last();

        expect(note.securityDeposit.value).toBe(securityDeposit);
    });

    it("Deve actualizar o stock dos artigos devolvidos", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemRepository = new ItemRepositoryStub();
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const repository = new InmemGoodsReturnsNoteRepository();

        const service = new GoodsReturnService(repository, goodsIssueRepository, itemRepository);

        await service.returningGoods(goodsIssueNoteId, securityDeposit);

        const item = await itemRepository.getById(ID.fromString("1001"));

        expect(item.getStock().quantity).toBe(13);
    });

    it("Deve ", async () => {});
});

const securityDeposit = "100,00";
