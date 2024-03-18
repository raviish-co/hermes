import { describe, expect, it } from "vitest";
import { left } from "../../shared/either";

describe("Test Goods Receipt", () => {
    it("Deve retornar um erro **InvalidEntryDate** se a data de entrada de mercadoria não for definida", () => {
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
        const service = new GoodsReceiptService();

        const error = service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidEntryDate);
    });
});

export class GoodsReceiptService {
    new(data: GoodsReceiptDTO) {
        return left(new InvalidEntryDate(data.entryDate));
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
    condition: Condition;
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
