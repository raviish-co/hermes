import { describe, expect, it } from "vitest";
import { WarehouseService } from "../../application/warehouse_service";
import { ItemStockRepositoryStub } from "../stubs/item_stock_repository_stub";
import { ItemStockNotFound } from "../../domain/warehouse/item_stock_not_found";
import { ID } from "../../shared/id";
import type { ItemStock } from "../../domain/warehouse/item_stock";
import { DefaultPurposeSpecification } from "../../adapters/default_purpose_specification";
import type { ItemStockRepository } from "../../domain/warehouse/item_stock_repository";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import { InmemGoodsIssueNoteRepository } from "../../persistence/inmem/inmem_goods_issue_note_repository";
import { InmemSequenceStorage } from "../../persistence/inmem/inmem_sequence_storage";
import { SequenceGenerator } from "../../adapters/sequences/sequence_generator";
import { GoodsIssueService } from "../../application/goods_issue_service";

describe("WharehouseService - Artigos em Stock", async () => {
    it("listItemStock - Deve recuperar os artigos em stock", async () => {
        const itemStockRepositoy = new ItemStockRepositoryStub();
        const service = new WarehouseService(itemStockRepositoy);

        const itemsStock = await service.listItemStock();

        expect(itemsStock.length).toEqual(13);
    });

    it("enableItemInStockToInternalUse - Deve habilitar o artigo para uso interno", async () => {
        const itemStockRepository = new ItemStockRepositoryStub();
        const service = new WarehouseService(itemStockRepository);
        const itemId = ID.fromString("1011");
        await makeGoodsIssueService(itemStockRepository);

        await service.enableItemInStockToInternalUse(itemId.toString());

        const itemStockOrErr = await itemStockRepository.getById(itemId);

        expect(itemStockOrErr.isRight()).toBeTruthy();
        expect((itemStockOrErr.value as ItemStock).itemStockType).toBe("Interno");
    });

    it("enableItemInStockToInternalUse - Não deve habilitar o artigo para uso interno se o valor total das saídas for menor que o valor de consignação", async () => {
        const itemStockRepository = new ItemStockRepositoryStub();
        const service = new WarehouseService(itemStockRepository);
        const itemId = ID.fromString("1013");
        await makeGoodsIssueService(itemStockRepository);

        await service.enableItemInStockToInternalUse(itemId.toString());

        const itemStockOrErr = await itemStockRepository.getById(itemId);

        expect(itemStockOrErr.isRight()).toBeTruthy();
        expect((itemStockOrErr.value as ItemStock).itemStockType).toBe("Consignação");
    });

    it("enableItemInStockToInternalUse - Deve retornar erro se o item não for encontrado no repositório", async () => {
        const itemStockRepository = new ItemStockRepositoryStub();
        const service = new WarehouseService(itemStockRepository);

        const voidOrErr = await service.enableItemInStockToInternalUse("invalid-item-id");

        expect(voidOrErr.isLeft()).toBeTruthy();
        expect(voidOrErr.value).toBeInstanceOf(ItemStockNotFound);
    });
});

async function makeGoodsIssueService(itemStockRepo?: ItemStockRepository) {
    const purposeSource = new DefaultPurposeSpecification();
    const itemRepository = new ItemRepositoryStub();
    const noteRepository = new InmemGoodsIssueNoteRepository();
    const storage = new InmemSequenceStorage();
    const generator = new SequenceGenerator(storage, 1000);
    const itemStockRepository = itemStockRepo ? itemStockRepo : new ItemStockRepositoryStub();
    const service = new GoodsIssueService(
        itemRepository,
        itemStockRepository,
        noteRepository,
        generator,
        purposeSource
    );

    const goodsIssueData = {
        purpose: {
            description: "Lavandaria",
            details: "Interna",
            notes: "Nome",
        },
        lines: [
            {
                itemId: "1011",
                goodQuantities: 1,
            },
        ],
        total: 6500,
        returnDate: "2021-01-01T16:40:00",
        userId: "1000",
    };

    await service.new(goodsIssueData);
}
