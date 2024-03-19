import { ItemNotFound } from "../../domain/catalog/item_not_found_error";
import type { ItemRepository } from "../../domain/catalog/item_repository";
import { type Either, left, right } from "../../shared/either";
import { ItemStock } from "../../domain/catalog/item_stock";
import type { Pagination } from "../../shared/pagination";
import { Item, Status } from "../../domain/catalog/item";
import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";

export class ItemRepositoryStub implements ItemRepository {
    #items: Record<string, Item> = {};

    constructor() {
        this.#populate();
    }

    getById(itemId: ID): Promise<Item> {
        return Promise.resolve(this.#items[itemId.toString()]);
    }

    findAll(queries: ID[]): Promise<Either<ItemNotFound, Item[]>> {
        const items: Item[] = [];

        for (const query of queries) {
            const filtered = this.records.find(
                (item) => item.itemId.toString() === query.toString()
            );

            if (!filtered) return Promise.resolve(left(new ItemNotFound(query.toString())));

            items.push(filtered);
        }
        return Promise.resolve(right(items));
    }

    list(pageToken: number, perPage: number): Promise<Pagination<Item>> {
        const startIndex = (pageToken - 1) * perPage;

        const endIndex = startIndex + perPage;

        const result = this.records.slice(startIndex, endIndex);

        const total = Math.ceil(this.records.length / perPage);

        return Promise.resolve({
            pageToken,
            perPage,
            total,
            result,
        });
    }

    search(query: string, pageToken: number, perPage: number): Promise<Pagination<Item>> {
        const items = this.records.filter((i) => {
            return (
                i.name.toLowerCase().includes(query.toLowerCase()) ||
                i.itemId.toString().includes(query) ||
                i.fulltext.includes(query.toLowerCase())
            );
        });

        const startIndex = (pageToken - 1) * perPage;

        const endIndex = startIndex + perPage;

        const result = items.slice(startIndex, endIndex);

        const total = Math.ceil(items.length / perPage);

        return Promise.resolve({
            pageToken,
            perPage,
            total,
            result,
        });
    }

    updateAll(items: Item[]): Promise<void> {
        for (const item of items) {
            this.#items[item.itemId.toString()] = item;
        }

        return Promise.resolve(undefined);
    }

    saveAll(items: Item[]): Promise<void> {
        for (const item of items) {
            this.#items[item.itemId.toString()] = item;
        }
        return Promise.resolve(undefined);
    }

    get records(): Item[] {
        return Object.values(this.#items);
    }

    last(): Promise<Item> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    #populate() {
        const item1 = new Item(
            ID.fromString("1001"),
            ID.random(),
            "T-shirt desportiva gola redonda",
            ID.random(),
            new Decimal(4500),
            { "1": "Cor: Branco" },
            new ItemStock(10),
            { status: Status.Good }
        );

        const item2 = new Item(
            ID.fromString("1002"),
            ID.random(),
            "Calça Jeans Skinny",
            ID.random(),
            new Decimal(15500),
            { "1": "Cor: Castanho", "2": "Marca: Gucci" },
            new ItemStock(10),
            { status: Status.Good }
        );

        const item3 = new Item(
            ID.fromString("1003"),
            ID.random(),
            "Moletom com Capuz",
            ID.random(),
            new Decimal(1000),
            { "1": "Cor: Verde", "2": "Marca: Adidas" },
            new ItemStock(7),
            { status: Status.Good }
        );

        const item4 = new Item(
            ID.fromString("1004"),
            ID.random(),
            "Shorts Esportivo",
            ID.random(),
            new Decimal(1000),
            { "1": "Cor: Verde", "2": "Marca: Adidas" },
            new ItemStock(7),
            { status: Status.Good }
        );

        const item5 = new Item(
            ID.fromString("1005"),
            ID.random(),
            "Casaco de Inverno",
            ID.random(),
            new Decimal(1000),
            { "1": "Cor: Cinza", "2": "Tamanho: M", "3": "Marca: Polo" },
            new ItemStock(8),
            { status: Status.Good }
        );

        const item6 = new Item(
            ID.fromString("1006"),
            ID.random(),
            "Camiseta Polo de Manga Longa",
            ID.random(),
            new Decimal(1000),
            { "1": "Cor: Preta", "2": "Marca: Polo" },
            new ItemStock(8),
            { status: Status.Good }
        );

        const item7 = new Item(
            ID.fromString("1007"),
            ID.random(),
            "Casaco casual de inverno",
            ID.random(),
            new Decimal(2500),
            { "1": "Cor: Castanho", "2": "Marca: Levis" },
            new ItemStock(10),
            { status: Status.Good }
        );

        this.#items = {
            "1001": item1,
            "1002": item2,
            "1003": item3,
            "1004": item4,
            "1005": item5,
            "1006": item6,
            "1007": item7,
        };
    }
}
