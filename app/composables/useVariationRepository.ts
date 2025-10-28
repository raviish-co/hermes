import { FixedVariationRepository } from "@backend/persistence/fixed/fixed_variation_repository";

const repository = new FixedVariationRepository();

export const useVariationRepository = () => repository;
