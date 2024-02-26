import type { GoodsIssueLine } from "@frontend/models/goods_issue";

export const GOODS_ISSUE_LINES: GoodsIssueLine[] = [
    {
        itemId: "1001",
        name: "T-shirt desportiva gola redonda",
        price: "4500,00",
        variationsValues: [{ variationId: "1", value: "Cor: Preto" }],
        quantity: 10,
        stock: 16,
        total: "45 000,00",
        condition: { status: "Bom", comment: undefined },
    },
    {
        itemId: "1002",
        name: "Sapato social",
        price: "15500,00",
        variationsValues: [{ variationId: "2", value: "Marca: Nike" }],
        quantity: 10,
        stock: 16,
        total: "45 000,00",
        condition: { status: "Bom", comment: undefined },
    },
    {
        itemId: "1003",
        name: "Calça jeans",
        price: "5500,00",
        variationsValues: [{ variationId: "3", value: "Tamanho: 42" }],
        quantity: 10,
        stock: 16,
        total: "45 000,00",
        condition: { status: "Bom", comment: undefined },
    },
];
