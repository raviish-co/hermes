import { Item, Status } from "../../domain/catalog/item";
import { ItemStock } from "../../domain/catalog/item_stock";
import { GoodsIssueLine } from "../../domain/goods_issue/goods_issue_line";
import { GoodsIssueNote } from "../../domain/goods_issue/goods_issue_note";
import { InmemGoodsIssueNoteRepository } from "../../persistense/inmem/inmem_goods_issue_note_repository";
import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";

export class GoodsIssueRepositoryStub extends InmemGoodsIssueNoteRepository {
    constructor() {
        super(
            _goodsIssueData.map(
                (gi) =>
                    new GoodsIssueNote(gi.noteId, gi.purpose, gi.userId, gi.returnDate, gi.lines)
            )
        );
    }
}

const _item = new Item(
    ID.fromString("1001"),
    ID.random(),
    "Item 1",
    ID.random(),
    Decimal.fromString("1000"),
    { "1": "Cor: Preta" },
    new ItemStock(1),
    { status: Status.Good }
);

const _goodsIssueData = [
    {
        noteId: ID.fromString("GS - 1000"),
        purpose: {
            description: "Uso Pessoal",
            details: "Uso Pessoal",
            notes: "Uso Pessoal",
        },
        userId: ID.fromString("1"),
        returnDate: new Date(),
        lines: [new GoodsIssueLine(_item, 3)],
    },
];
