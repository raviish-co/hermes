import { DefaultPurposeSpecification } from "@backend/adapters/default_purpose_specification";

const spec = new DefaultPurposeSpecification();

export const usePurposeSpec = () => spec;
