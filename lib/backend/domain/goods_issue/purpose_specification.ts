import type { Purpose } from "@backend/domain/goods_issue/purpose";

export interface PurposeSpecification {
    isSatisfiedBy(purpose: Purpose): boolean;
}
