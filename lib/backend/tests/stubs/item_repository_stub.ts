import { InmemItemRepository } from "../../persistense/inmem/inmem_item_repository";
import { ItemStock } from "../../domain/catalog/items/item_stock";
import { Item, Status } from "../../domain/catalog/items/item";
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
                        new ItemStock(i.stock),
                        i.condition,
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
        stock: 10,
        condition: { status: Status.Good },
        categoryId: "1001",
        sectionId: "1001",
        variationsValues: { "1": "Cor: Branco" },
    },
    {
        itemId: "1002",
        name: "Calça Jeans Skinny",
        price: 15500,
        stock: 10,
        condition: { status: Status.Good },
        categoryId: "1002",
        sectionId: "1002",
        variationsValues: { "1": "Cor: Castanho", "2": "Marca: Gucci" },
    },
    {
        itemId: "1003",
        name: "Moletom com Capuz",
        price: 1000,
        stock: 7,
        condition: { status: Status.Good },
        categoryId: "1003",
        sectionId: "1003",
        variationsValues: { "1": "Cor: Verde", "2": "Marca: Adidas" },
    },
    {
        itemId: "1004",
        name: "Shorts Desportivo",
        price: 1000,
        stock: 7,
        condition: { status: Status.Good },
        categoryId: "1004",
        sectionId: "1004",
        variationsValues: { "1": "Cor: Verde", "2": "Marca: Adidas" },
        tags: ["Verão", "Desporto"],
    },
    {
        itemId: "1005",
        name: "Casaco de Inverno",
        price: 1000,
        stock: 8,
        condition: { status: Status.Good },
        categoryId: "1005",
        sectionId: "1005",
        variationsValues: { "1": "Cor: Cinza", "2": "Tamanho: M", "3": "Marca: Polo" },
    },
    {
        itemId: "1006",
        name: "Camiseta Polo de Manga Longa",
        price: 1000,
        stock: 8,
        condition: { status: Status.Good },
        categoryId: "1006",
        sectionId: "1006",
        variationsValues: { "1": "Cor: Preta", "2": "Marca: Polo" },
    },
    {
        itemId: "1007",
        name: "Casaco casual de inverno",
        price: 2500,
        stock: 10,
        condition: { status: Status.Good },
        categoryId: "1007",
        sectionId: "1007",
        variationsValues: { "1": "Cor: Castanho", "2": "Marca: Levis" },
    },
];
