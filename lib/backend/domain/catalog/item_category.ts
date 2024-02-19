import { ItemCategoryStock } from "@backend/domain/catalog/item_category_stock";
import { Decimal } from "@backend/shared/decimal";
import { ID } from "@backend/shared/id";

type Variation = {
    variationId: string;
    value: string;
};

type Section = {
    name: string;
    department?: string;
};

type Options = {
    itemId: string;
    name: string;
    price: string;
    unique?: boolean;
    categoryId: ID;
    condition: ItemCondition;
    stock: ItemCategoryStock;
    section?: Section;
    variations?: Variation[];
};

export enum ItemStatus {
    Good = "Bom",
    Bad = "Mau",
}

export type ItemCondition = {
    status: ItemStatus;
    comment?: string;
};

export class ItemCategory {
    readonly itemId: ID;
    readonly name: string;
    readonly categoryId: ID;
    readonly #stock: ItemCategoryStock;
    #condition: ItemCondition;
    price: Decimal;
    section?: Section;
    unique?: boolean;
    variations?: Variation[];
    fulltext: string = "";

    private constructor(
        itemId: ID,
        name: string,
        price: Decimal,
        categoryId: ID,
        condition: ItemCondition,
        stockItem: ItemCategoryStock,
        variations?: Variation[]
    ) {
        this.itemId = itemId;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this.#condition = condition;
        this.#stock = stockItem;
        this.variations = variations;
    }

    static create(options: Options): ItemCategory {
        const { itemId, name, price, unique, categoryId, condition, stock, section, variations } =
            options;

        const newID = ID.New(itemId);

        const priceDecimal = Decimal.fromString(price);

        const item = new ItemCategory(
            newID,
            name,
            priceDecimal,
            categoryId,
            condition,
            stock,
            variations
        );

        if (variations) {
            item.variations = variations;
            const variationsNames = variations.map((v) => v.value);
            item.fulltext = variationsNames.join(" ").toLowerCase();
        }

        if (unique) {
            item.unique = unique;
            item.#stock.update(1);
        }

        if (section) {
            item.section = section;
        }

        return item;
    }

    isUnique(): boolean {
        return this.unique == true;
    }

    updateCondition(condition: Condition): void {
        const { status, comment } = condition;
        if (ItemStatus.Good == status) {
            this.#condition = { status: ItemStatus.Good };
            return;
        }
        this.#condition = { status: ItemStatus.Bad, comment };
    }

    canBeReducedStock(quantity: number): boolean {
        return this.#stock.verify(quantity);
    }

    reduceStock(quantity: number): void {
        this.#stock.reduce(quantity);
    }

    getCondition(): ItemCondition {
        return this.#condition;
    }

    getStock(): ItemCategoryStock {
        return this.#stock;
    }
}
