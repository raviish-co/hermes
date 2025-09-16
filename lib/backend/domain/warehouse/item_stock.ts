import type { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";

export enum ItemsStatus {
    CONSIGNACAO = "Consignação",
    INTERNO = "Interno",
}

export class ItemStock {
    #itemStockId: ID;
    #itemId: ID;
    #goodQuantities: number;
    #badQuantities: number;
    #status: string;
    #consignmentPrice: number;
    #totalCostOfDepartures: number = 0;

    constructor(
        itemId: ID,
        goodQuantities: number,
        consignmentPrice: number,
        badQuantities?: number,
        status?: string
    ) {
        this.#itemStockId = ID.random();
        this.#itemId = itemId;
        this.#goodQuantities = goodQuantities;
        this.#badQuantities = badQuantities ?? 0;
        this.#consignmentPrice = consignmentPrice;
        this.#status = status ?? ItemsStatus.CONSIGNACAO;
    }

    static create(itemId: ID): ItemStock {
        return new ItemStock(itemId, 0, 0, 0);
    }

    static restore(
        itemStockId: string,
        itemId: string,
        goodQuantities: number,
        badQuantities: number,
        status: string,
        consignmentPrice: number
    ): ItemStock {
        const itemStock = new ItemStock(
            ID.fromString(itemId),
            goodQuantities,
            consignmentPrice,
            badQuantities,
            status
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

    updateStatusToInternal(): void {
        this.#status = ItemsStatus.INTERNO;
    }

    calculateTotalCostOfDepartures(value: Decimal): void {
        this.#totalCostOfDepartures += value.value;
    }

    isTotalCostOfDeparturesGreaterThan(value: number): boolean {
        return this.totalCostOfDepartures > value;
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

    get status(): string {
        return this.#status;
    }

    get consignmentPrice(): number {
        return this.#consignmentPrice;
    }

    get totalCostOfDepartures(): number {
        return this.#totalCostOfDepartures;
    }
}
