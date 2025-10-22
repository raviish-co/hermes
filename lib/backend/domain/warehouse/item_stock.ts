import { ID } from "../../shared/id";
import { ItemStockType } from "./item_stock_type";

export class ItemStock {
    #itemStockId: ID;
    #itemId: ID;
    #goodQuantities: number;
    #badQuantities: number;
    #itemStockType: string;
    #consignmentValue: number;
    #totalValueOfOutputs: number;

    constructor(
        itemId: ID,
        goodQuantities: number,
        badQuantities?: number,
        itemStockType?: string,
        consignmentValue?: number,
        totalValueOfOutputs?: number
    ) {
        this.#itemStockId = ID.random();
        this.#itemId = itemId;
        this.#goodQuantities = goodQuantities;
        this.#badQuantities = badQuantities ?? 0;
        this.#itemStockType = this.#getItemStockType(itemStockType);
        this.#consignmentValue = consignmentValue ?? 0;
        this.#totalValueOfOutputs = totalValueOfOutputs ?? 0;
    }

    static create(itemId: ID): ItemStock {
        return new ItemStock(itemId, 0, 0);
    }

    static restore(
        itemStockId: string,
        itemId: string,
        goodQuantities: number,
        badQuantities: number,
        itemStockType: string,
        consignmentValue: number,
        totalValueOfOutputs: number
    ): ItemStock {
        const itemStock = new ItemStock(
            ID.fromString(itemId),
            goodQuantities,
            badQuantities,
            itemStockType,
            consignmentValue,
            totalValueOfOutputs
        );
        itemStock.#itemStockId = ID.fromString(itemStockId);
        return itemStock;
    }

    isOutOfStock(): boolean {
        return this.total === 0;
    }

    increase(goodQuantities: number, badQuantities?: number): void {
        this.#goodQuantities += goodQuantities;

        if (!badQuantities) return;

        this.#badQuantities += badQuantities;
    }

    reduce(goodQuantities: number, badQuantities?: number): void {
        this.#goodQuantities -= goodQuantities;

        if (!badQuantities) return;

        this.#badQuantities -= badQuantities;
    }

    canReduce(goodQuantities: number, badQuantities?: number): boolean {
        if (goodQuantities > this.#goodQuantities) return false;

        if (!badQuantities) return true;

        if (badQuantities > this.#badQuantities) return false;

        return true;
    }

    calculateTotalValueOfOutputs(itemPrice: number): void {
        this.#totalValueOfOutputs += itemPrice;
    }

    #getItemStockType(itemStockType?: string): string {
        if (itemStockType === ItemStockType.Consignacao) {
            return ItemStockType.Consignacao;
        }

        return "";
    }

    markItemInStockAsIntern(): void {
        this.#itemStockType = ItemStockType.Interno;
    }

    get itemStockId(): ID {
        return this.#itemStockId;
    }

    get itemId(): ID {
        return this.#itemId;
    }

    get total(): number {
        return this.#goodQuantities + this.#badQuantities;
    }

    get goodQuantities(): number {
        return this.#goodQuantities;
    }

    get badQuantities(): number {
        return this.#badQuantities;
    }

    get itemStockType(): string {
        return this.#itemStockType;
    }

    get consignmentValue(): number {
        return this.#consignmentValue;
    }

    get totalValueOfOutputs(): number {
        return this.#totalValueOfOutputs;
    }
}
