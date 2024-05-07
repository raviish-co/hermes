import { Item } from "../../domain/catalog/items/item";
import { InmemItemRepository } from "../../persistense/inmem/inmem_item_repository";
import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";

export class ItemRepositoryStub extends InmemItemRepository {
    constructor() {
        super(
            _itemData.map(
                (i) =>
                    new Item(
                        ID.fromString(i.itemId),
                        i.name,
                        new Decimal(i.price),
                        ID.fromString(i.categoryId),
                        ID.fromString(i.sectionId),
                        i.variationsValues as Record<string, string>,
                        i.tags
                    )
            )
        );
    }
}

const _itemData = [
    {
        itemId: "1001",
        name: "T-shirt desportiva gola redonda",
        price: 4500,
        categoryId: "1",
        sectionId: "1",
        variationsValues: { "1": "Cor: Branco", "2": "Marca: Nike" },
    },
    {
        itemId: "1002",
        name: "Calça Jeans Skinny",
        price: 15500,
        categoryId: "4",
        sectionId: "1",
        variationsValues: { "1": "Cor: Castanho", "2": "Marca: Gucci" },
    },
    {
        itemId: "1003",
        name: "Moletom com Capuz",
        price: 1000,
        categoryId: "1",
        sectionId: "1",
        variationsValues: { "1": "Cor: Verde", "2": "Marca: Adidas" },
    },
    {
        itemId: "1004",
        name: "Shorts Desportivo",
        price: 1000,
        categoryId: "7",
        sectionId: "1",
        variationsValues: { "1": "Cor: Verde", "2": "Marca: Adidas" },
        tags: ["Verão", "Desporto"],
    },
    {
        itemId: "1005",
        name: "Casaco de Inverno",
        price: 1000,
        categoryId: "3",
        sectionId: "2",
        variationsValues: { "1": "Cor: Castanho", "2": "Marca: Polo", "5": "Tamanho: M" },
    },
    {
        itemId: "1006",
        name: "Camiseta Polo de Manga Longa",
        price: 1000,
        categoryId: "1",
        sectionId: "2",
        variationsValues: { "1": "Cor: Preta", "2": "Marca: Polo" },
    },
    {
        itemId: "1007",
        name: "Casaco casual de inverno",
        price: 2500,
        categoryId: "3",
        sectionId: "2",
        variationsValues: { "1": "Cor: Castanho", "2": "Marca: Polo", "5": "Tamanho: L" },
    },
    {
        itemId: "1008",
        name: "Jaqueta jeans casual",
        price: 7500,
        categoryId: "3",
        sectionId: "2",
        variationsValues: { "1": "Cor: Castanho", "2": "Marca: Polo", "5": "Tamanho: L" },
    },
    {
        itemId: "1009",
        name: "Jaqueta jeans castanho casual",
        price: 7500,
        categoryId: "3",
        sectionId: "2",
        variationsValues: { "1": "Cor: Castanho", "2": "Marca: Polo", "5": "Tamanho: L" },
    },
    {
        itemId: "1010",
        name: "Bermuda jeans casual",
        price: 7500,
        categoryId: "3",
        sectionId: "2",
        variationsValues: { "1": "Cor: Castanho", "2": "Marca: Polo", "5": "Tamanho: L" },
    },
    {
        itemId: "1011",
        name: "Calça de couro festiva (Skinny)",
        price: 6500,
        categoryId: "4",
        sectionId: "1",
        variationsValues: { "1": "Cor: Castanho", "2": "Marca: Gucci" },
    },
    {
        itemId: "1012",
        name: "Pull-over de lã festivo",
        price: 10500,
        categoryId: "4",
        sectionId: "1",
        variationsValues: { "1": "Cor: Castanho", "2": "Marca: Gucci" },
    },
];
