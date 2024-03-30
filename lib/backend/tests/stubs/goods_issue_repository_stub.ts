import { Item, Status } from "../../domain/catalog/items/item";
import { ItemStock } from "../../domain/catalog/items/item_stock";
import { GoodsIssueNoteLine } from "../../domain/goods_issue/goods_issue_note_line";
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
    "Item 1",
    new Decimal(1000),
    new ItemStock(1),
    { status: Status.Good },
    ID.random(),
    ID.random(),
    { "1": "Cor: Preta" }
);

const _item2 = new Item(
    ID.fromString("1002"),
    "Item 1",
    new Decimal(1000),
    new ItemStock(1),
    { status: Status.Good },
    ID.random(),
    ID.random(),
    { "1": "Cor: Preta" }
);

const _item4 = new Item(
    ID.fromString("1004"),
    "Item 1",
    new Decimal(1000),
    new ItemStock(7),
    { status: Status.Good },
    ID.random(),
    ID.random(),
    { "1": "Cor: Preta" }
);

const _item5 = new Item(
    ID.fromString("1005"),
    "Item 1",
    new Decimal(1000),
    new ItemStock(8),
    { status: Status.Good },
    ID.random(),
    ID.random(),
    { "1": "Cor: Preta" }
);

const _item6 = new Item(
    ID.fromString("1006"),
    "Item 1",
    new Decimal(1000),
    new ItemStock(8),
    { status: Status.Good },
    ID.random(),
    ID.random(),
    { "1": "Cor: Preta" }
);

const _item7 = new Item(
    ID.fromString("1007"),
    "Item 1",
    new Decimal(1000),
    new ItemStock(10),
    { status: Status.Good },
    ID.random(),
    ID.random(),
    { "1": "Cor: Preta" }
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
            new GoodsIssueNoteLine(
                _item.itemId,
                _item.name,
                _item.price,
                _item.fulltext,
                15,
                _item.variations!
            ),
            new GoodsIssueNoteLine(
                _item2.itemId,
                _item2.name,
                _item2.price,
                _item2.fulltext,
                15,
                _item2.variations!
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
            new GoodsIssueNoteLine(
                _item4.itemId,
                _item4.name,
                _item4.price,
                _item4.fulltext,
                3,
                _item4.variations!
            ),
            new GoodsIssueNoteLine(
                _item5.itemId,
                _item5.name,
                _item5.price,
                _item5.fulltext,
                2,
                _item5.variations!
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
            new GoodsIssueNoteLine(
                _item6.itemId,
                _item6.name,
                _item6.price,
                _item6.fulltext,
                2,
                _item6.variations!
            ),
        ],
    },
    {
        noteId: ID.fromString("GS - 1004"),
        purpose: {
            description: "Uso Pessoal",
            details: "Uso Pessoal",
            notes: "Uso Pessoal",
        },
        userId: ID.fromString("1"),
        returnDate: new Date(),
        lines: [
            new GoodsIssueNoteLine(
                _item7.itemId,
                _item7.name,
                _item7.price,
                _item7.fulltext,
                3,
                _item7.variations!
            ),
        ],
    },
];
