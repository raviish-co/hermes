import { Variation } from "../../domain/catalog/variations/variation";
import { InmemVariationRepository } from "../../persistence/inmem/inmem_variation_repository";
import { ID } from "../../shared/id";
import _variationsData from "./fixed_variation_data.json";

export class FixedVariationRepository extends InmemVariationRepository {
    constructor() {
        super(_variationsData.map((v) => new Variation(ID.fromString(v.id), v.name, v.values)));
    }
}
