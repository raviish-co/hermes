import type { Article } from "../models/article";

enum Color {
    Red = "Vermelho",
    Blue = "Azul",
    White = "Branco",
}

enum ClothingSize {
    M = "M",
    L = "L",
    XL = "XL",
}

enum ShoesSize {
    FourtyThree = "43",
    FourtyFive = "45",
    FourtyEight = "48",
}

enum Brand {
    Converse = "Converse",
    Adidas = "Adidas",
    Nike = "Nike",
}

export const ARTICLES: Article[] = [
    {
        id: "13424",
        name: "Adams Family Thing hand / Mão",
        price: "17,83",
        securityDeposit: "3,00",
        isUnique: false,
        variations: [
            [
                { name: "Cor", value: Color.Red },
                { name: "Tamanho", value: ClothingSize.L },
            ],
            [
                { name: "Cor", value: Color.White },
                { name: "Tamanho", value: ClothingSize.XL },
            ],
        ],
    },
    {
        id: "43242",
        name: "Base de Pele Clara 35 FU",
        price: "54,72",
        securityDeposit: "1,00",
        isUnique: true,
    },
    {
        id: "12822",
        name: "Sapatilhas planas respiráveis",
        price: "155,00",
        securityDeposit: "120,00",
        isUnique: false,
        variations: [
            [
                { name: "Cor", value: Color.White },
                { name: "Tamanho", value: ShoesSize.FourtyThree },
                { name: "Marca", value: Brand.Converse },
            ],
            [
                { name: "Cor", value: Color.White },
                { name: "Tamanho", value: ShoesSize.FourtyFive },
                { name: "Marca", value: Brand.Nike },
            ],
        ],
    },
    {
        id: "4328127",
        name: "Base de Pele Escura 35 FU",
        price: "20,00",
        securityDeposit: "30,00",
        isUnique: false,
    },
];
