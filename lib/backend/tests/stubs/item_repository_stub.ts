import { ItemNotFound } from "../../domain/catalog/items/item_not_found_error";
import type { ItemRepository } from "../../domain/catalog/items/item_repository";
import { type Either, left, right } from "../../shared/either";
import { ItemStock } from "../../domain/catalog/items/item_stock";
import type { Pagination } from "../../shared/pagination";
import { Item, Status } from "../../domain/catalog/items/item";
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

    save(item: Item): Promise<void> {
        this.#items[item.itemId.toString()] = item;
        return Promise.resolve(undefined);
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
            "T-shirt desportiva gola redonda",
            new Decimal(4500),
            new ItemStock(10),
            { status: Status.Good },
            ID.random(),
            ID.random(),
            { "1": "Cor: Branco" }
        );

        const item2 = new Item(
            ID.fromString("1002"),
            "Calça Jeans Skinny",
            new Decimal(15500),
            new ItemStock(10),
            { status: Status.Good },
            ID.random(),
            ID.random(),
            { "1": "Cor: Castanho", "2": "Marca: Gucci" }
        );

        const item3 = new Item(
            ID.fromString("1003"),
            "Moletom com Capuz",
            new Decimal(1000),
            new ItemStock(7),
            { status: Status.Good },
            ID.random(),
            ID.random(),
            { "1": "Cor: Verde", "2": "Marca: Adidas" }
        );

        const item4 = new Item(
            ID.fromString("1004"),
            "Shorts Esportivo",
            new Decimal(1000),
            new ItemStock(7),
            { status: Status.Good },
            ID.random(),
            ID.random(),
            { "1": "Cor: Verde", "2": "Marca: Adidas" }
        );

        const item5 = new Item(
            ID.fromString("1005"),
            "Casaco de Inverno",
            new Decimal(1000),
            new ItemStock(8),
            { status: Status.Good },
            ID.random(),
            ID.random(),
            { "1": "Cor: Cinza", "2": "Tamanho: M", "3": "Marca: Polo" }
        );

        const item6 = new Item(
            ID.fromString("1006"),
            "Camiseta Polo de Manga Longa",
            new Decimal(1000),
            new ItemStock(8),
            { status: Status.Good },
            ID.random(),
            ID.random(),
            { "1": "Cor: Preta", "2": "Marca: Polo" }
        );

        const item7 = new Item(
            ID.fromString("1007"),
            "Casaco casual de inverno",
            new Decimal(2500),
            new ItemStock(10),
            { status: Status.Good },
            ID.random(),
            ID.random(),
            { "1": "Cor: Castanho", "2": "Marca: Levis" }
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
