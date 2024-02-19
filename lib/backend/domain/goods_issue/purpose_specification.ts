import type { Purpose } from "../../domain/goods_issue/purpose";

export interface PurposeSpecification {
    isSatisfiedBy(purpose: Purpose): boolean;
}
