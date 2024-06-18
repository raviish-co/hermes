import { Item } from "../../domain/catalog/items/item";
import { GoodsIssueNote } from "../../domain/goods_issue/goods_issue_note";
import { GoodsIssueNoteLine } from "../../domain/goods_issue/goods_issue_note_line";
import { InmemGoodsIssueNoteRepository } from "../../persistense/inmem/inmem_goods_issue_note_repository";
import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";

export class GoodsIssueNoteRepositoryStub extends InmemGoodsIssueNoteRepository {
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
    ID.random(),
    ID.random(),
    { "1": "Cor: Preta" }
);

const _item2 = new Item(
    ID.fromString("1002"),
    "Item 1",
    new Decimal(1000),
    ID.random(),
    ID.random(),
    { "1": "Cor: Preta" }
);

const _item4 = new Item(
    ID.fromString("1004"),
    "Item 1",
    new Decimal(1000),
    ID.random(),
    ID.random(),
    { "1": "Cor: Preta" }
);

const _item5 = new Item(
    ID.fromString("1005"),
    "Item 1",
    new Decimal(1000),
    ID.random(),
    ID.random(),
    { "1": "Cor: Preta" }
);

const _item6 = new Item(
    ID.fromString("1006"),
    "Item 1",
    new Decimal(1000),
    ID.random(),
    ID.random(),
    { "1": "Cor: Preta" }
);

const _item7 = new Item(
    ID.fromString("1007"),
    "Item 1",
    new Decimal(1000),
    ID.random(),
    ID.random(),
    { "1": "Cor: Preta" }
);

const _item9 = new Item(
    ID.fromString("1009"),
    "Item 1",
    new Decimal(1000),
    ID.random(),
    ID.random(),
    { "1": "Cor: Preta" }
);

const _item10 = new Item(
    ID.fromString("1010"),
    "Item 1",
    new Decimal(1000),
    ID.random(),
    ID.random(),
    { "1": "Cor: Preta" }
);

const _item11 = new Item(
    ID.fromString("1011"),
    "Item 1",
    new Decimal(1000),
    ID.random(),
    ID.random(),
    { "1": "Cor: Preta" }
);

const _item12 = new Item(
    ID.fromString("1012"),
    "Item 1",
    new Decimal(1000),
    ID.random(),
    ID.random(),
    { "1": "Cor: Preta" }
);

const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

const _goodsIssueData = [
    {
        noteId: ID.fromString("GS - 1000"),
        purpose: {
            description: "Uso Pessoal",
            details: "John Doe",
            notes: "",
        },
        userId: ID.fromString("1"),
        returnDate: tomorrow,
        lines: [
            new GoodsIssueNoteLine(_item.itemId, _item.name, _item.price, 15, 0, _item.variations!),
            new GoodsIssueNoteLine(
                _item2.itemId,
                _item2.name,
                _item2.price,
                15,
                0,

                _item2.variations!
            ),
        ],
    },
    {
        noteId: ID.fromString("GS - 1002"),
        purpose: {
            description: "Uso Pessoal",
            details: "John Doe",
            notes: "",
        },
        userId: ID.fromString("1"),
        returnDate: tomorrow,
        lines: [
            new GoodsIssueNoteLine(
                _item4.itemId,
                _item4.name,
                _item4.price,
                3,
                0,

                _item4.variations!
            ),
            new GoodsIssueNoteLine(
                _item5.itemId,
                _item5.name,
                _item5.price,
                2,
                0,

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
        returnDate: tomorrow,
        lines: [
            new GoodsIssueNoteLine(
                _item6.itemId,
                _item6.name,
                _item6.price,
                2,
                0,

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
                3,
                0,

                _item7.variations!
            ),
        ],
    },

    {
        noteId: ID.fromString("GS - 1005"),
        purpose: {
            description: "Uso Pessoal",
            details: "Uso Pessoal",
            notes: "Uso Pessoal",
        },
        userId: ID.fromString("1"),
        returnDate: new Date(),
        lines: [
            new GoodsIssueNoteLine(
                _item9.itemId,
                _item9.name,
                _item9.price,
                3,
                0,

                _item9.variations!
            ),
            new GoodsIssueNoteLine(
                _item10.itemId,
                _item10.name,
                _item10.price,
                3,
                0,

                _item10.variations!
            ),
        ],
    },
    {
        noteId: ID.fromString("GS - 1006"),
        purpose: {
            description: "Gravação",
            details: "Filme",
            notes: "Deadpool",
        },
        userId: ID.fromString("1"),
        returnDate: new Date(),
        lines: [
            new GoodsIssueNoteLine(
                _item11.itemId,
                _item11.name,
                _item11.price,
                10,
                10,

                _item11.variations!
            ),
            new GoodsIssueNoteLine(
                _item12.itemId,
                _item12.name,
                _item12.price,
                10,
                10,

                _item12.variations!
            ),
        ],
    },
];
