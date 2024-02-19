import type { Purpose } from "@backend/domain/requests/purpose";

export interface PurposeSpecification {
    isSatisfiedBy(purpose: Purpose): boolean;
}
