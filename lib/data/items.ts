import type { Item } from "../models/item";

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

export const ITEMS: Item[] = [
    {
        id: "13424",
        name: "Adams Family Thing hand / Mão",
        price: "17,83",
        isUnique: false,
        stock: 4,
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
        isUnique: true,
        stock: 1,
    },
    {
        id: "12822",
        name: "Sapatilhas planas respiráveis",
        price: "155,00",
        isUnique: false,
        stock: 15,
        variations: [
            [
                { name: "Cor", value: Color.White },
                { name: "Tamanho", value: ShoesSize.FourtyThree },
                { name: "Marca", value: Brand.Converse },
                { name: "Marca", value: Brand.Converse },
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
        isUnique: false,
        stock: 6,
    },
];
