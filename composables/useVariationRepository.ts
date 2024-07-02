import { FixedVariationRepository } from "~/lib/backend/persistence/fixed/fixed_variation_repository";

const repository = new FixedVariationRepository();

export const useVariationRepository = () => repository;
