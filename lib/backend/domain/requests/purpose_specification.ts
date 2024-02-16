import type { Purpose } from "./purpose";

export interface PurposeSpecification {
    isSatisfiedBy(purpose: Purpose): boolean;
}
