import definitions from "../data/purposes.json";
import type { Purpose } from "../domain/goods_issue/purpose";
import type { PurposeSpecification } from "../domain/goods_issue/purpose_specification";

export class DefaultPurposeSpecification implements PurposeSpecification {
    isSatisfiedBy(purpose: Purpose): boolean {
        const specs = definitions.find((d) => d.description === purpose.description);

        if (!specs) return false;

        if (!purpose.notes && specs.notesType) return false;

        if (purpose.notes && !specs.notesType) return false;

        if (specs.detailsConstraint.length === 0 && purpose.details) return false;

        if (specs.detailsConstraint.length > 0 && !purpose.details) return false;

        if (specs.detailsConstraint.length === 0) return true;

        if (!specs.detailsConstraint.includes(purpose.details!)) return false;

        return true;
    }
}
