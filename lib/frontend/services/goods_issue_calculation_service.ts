import { convertToNumber } from "../helpers/convert_to_number";
import { formatCurrency } from "../helpers/format_currency";

export class GoodsIssueCalculationService {
    #grandTotal: number = 0;
    #securityDeposit: number = 0;

    initializeGrandTotalAndSecurityDeposit() {
        this.#grandTotal = 0;
        this.#securityDeposit = 0;
    }

    calculateLineTotal(price: string, quantity: number): string {
        const p = convertToNumber(price);

        const lt = (p * quantity) / 100;

        this.#calculateGrandTotal(lt);

        this.#calculateSecurityDeposit();

        return formatCurrency(lt);
    }

    #calculateGrandTotal(lineTotal: number): void {
        this.#grandTotal += lineTotal;
    }

    #calculateSecurityDeposit(): void {
        this.#securityDeposit = this.#grandTotal * 2;
    }

    get grandTotal(): string {
        return formatCurrency(this.#grandTotal);
    }

    get securityDeposit(): string {
        return formatCurrency(this.#securityDeposit);
    }
}
