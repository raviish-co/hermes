import { GoodsIssueLine } from "../../domain/goods_issue/goods_issue_line";
import { GoodsIssueNote } from "../../domain/goods_issue/goods_issue_note";
import { InmemGoodsIssueRepository } from "../../persistense/inmem/inmem_goods_issue_repository";
import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";

export class GoodsIssueRepositoryStub extends InmemGoodsIssueRepository {
    constructor() {
        super(
            _goodsIssueData.map(
                (gi) =>
                    new GoodsIssueNote(gi.noteId, gi.purpose, gi.userId, gi.returnDate, gi.lines)
            )
        );
    }
}

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
        lines: [new GoodsIssueLine(ID.fromString("1001"), Decimal.fromString("0"), 3)],
    },
];
