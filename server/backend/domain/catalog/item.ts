import { Condition } from "../../shared/types";
import { ID } from "../../shared/id";
import { Product } from "./product";

type Options = {
    itemId: string;
    product: Product;
    condition: ItemCondition;
    variations?: string[];
};

export enum ItemStatus {
    Good = "Bom",
    Bad = "Mau",
}

export type ItemCondition = {
    status: ItemStatus;
    comment?: string;
};

export class Item {
    readonly itemId: ID;
    readonly product: Product;
    condition: ItemCondition;
    variations?: ID[];

    private constructor(itemId: ID, product: Product, condition: ItemCondition, variations?: ID[]) {
        this.itemId = itemId;
        this.product = product;
        this.condition = condition;
        this.variations = variations;
    }

    static create(options: Options): Item {
        const { itemId, product, condition, variations } = options;

        const newID = ID.New(itemId);

        const item = new Item(newID, product, condition);

        if (!variations) return item;

        item.variations = variations.map((v) => ID.New(v));

        return item;
    }

    updateCondition(condition: Condition): void {
        const { status, comment } = condition;
        if (ItemStatus.Good == status) {
            this.condition = { status: ItemStatus.Good };
            return;
        }
        this.condition = { status: ItemStatus.Bad, comment };
    }

    getCondition(): ItemCondition {
        return this.condition;
    }
}
