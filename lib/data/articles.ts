import type { Article } from "../models/article";

export const ARTICLES: Article[] = [
    {
        id: "13424",
        name: "Adams Family Thing hand / Mão",
        price: 1000,
        securityDeposit: 1000,
        isUnique: true,
        variations: [
            {
                name: "Cor",
                items: ["Bege"],
            },
            {
                name: "Altura",
                items: ["14cm"],
            },
            {
                name: "Tamanho",
                items: ["M", "XL"],
            },
        ],
    },
    {
        id: "43242",
        name: "Base de Pele Clara 35 FU",
        price: 1000,
        securityDeposit: 1000,
        isUnique: false,
    },
];
