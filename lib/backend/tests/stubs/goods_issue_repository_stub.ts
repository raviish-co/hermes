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
                (note) =>
                    new GoodsIssueNote(
                        note.noteId,
                        note.purpose,
                        note.userId,
                        note.returnDate,
                        note.lines
                    )
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

const _item2 = new Item(
    ID.fromString("1002"),
    ID.random(),
    "Item 1",
    ID.random(),
    Decimal.fromString("1000"),
    { "1": "Cor: Preta" },
    new ItemStock(1),
    { status: Status.Good }
);

const _item3 = new Item(
    ID.fromString("1003"),
    ID.random(),
    "Item 1",
    ID.random(),
    Decimal.fromString("1000"),
    { "1": "Cor: Preta" },
    new ItemStock(8),
    { status: Status.Good }
);

const _item4 = new Item(
    ID.fromString("1004"),
    ID.random(),
    "Item 1",
    ID.random(),
    Decimal.fromString("1000"),
    { "1": "Cor: Preta" },
    new ItemStock(7),
    { status: Status.Good }
);

const _item5 = new Item(
    ID.fromString("1005"),
    ID.random(),
    "Item 1",
    ID.random(),
    Decimal.fromString("1000"),
    { "1": "Cor: Preta" },
    new ItemStock(8),
    { status: Status.Good }
);

const _item6 = new Item(
    ID.fromString("1006"),
    ID.random(),
    "Item 1",
    ID.random(),
    Decimal.fromString("1000"),
    { "1": "Cor: Preta" },
    new ItemStock(8),
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
        lines: [
            new GoodsIssueLine(
                _item.itemId,
                _item.name,
                _item.price,
                3,
                _item.variations,
                _item.fulltext
            ),
            new GoodsIssueLine(
                _item2.itemId,
                _item2.name,
                _item2.price,
                2,
                _item2.variations,
                _item2.fulltext
            ),
        ],
    },
    {
        noteId: ID.fromString("GS - 1001"),
        purpose: {
            description: "Uso Pessoal",
            details: "Uso Pessoal",
            notes: "Uso Pessoal",
        },
        userId: ID.fromString("1"),
        returnDate: new Date(),
        lines: [
            new GoodsIssueLine(
                _item3.itemId,
                _item3.name,
                _item3.price,
                2,
                _item3.variations,
                _item3.fulltext
            ),
        ],
    },
    {
        noteId: ID.fromString("GS - 1002"),
        purpose: {
            description: "Uso Pessoal",
            details: "Uso Pessoal",
            notes: "Uso Pessoal",
        },
        userId: ID.fromString("1"),
        returnDate: new Date(),
        lines: [
            new GoodsIssueLine(
                _item4.itemId,
                _item4.name,
                _item4.price,
                3,
                _item4.variations,
                _item4.fulltext
            ),
            new GoodsIssueLine(
                _item5.itemId,
                _item5.name,
                _item5.price,
                2,
                _item5.variations,
                _item5.fulltext
            ),
        ],
    },
    {
        noteId: ID.fromString("GS - 1003"),
        purpose: {
            description: "Uso Pessoal",
            details: "Uso Pessoal",
            notes: "Uso Pessoal",
        },
        userId: ID.fromString("1"),
        returnDate: new Date(),
        lines: [
            new GoodsIssueLine(
                _item6.itemId,
                _item6.name,
                _item6.price,
                2,
                _item6.variations,
                _item6.fulltext
            ),
        ],
    },
];
