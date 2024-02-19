import { Variation } from "../../domain/catalog/variation";
import { InmemVariationRepository } from "../../persistense/inmem/inmem_variation_repository";
import { ID } from "../../shared/id";

export class VariationsRepositoryStub extends InmemVariationRepository {
    constructor() {
        super(_variationsData.map((v) => new Variation(v.id, v.name, v.values)));
    }
}

const _variationsData = [
    {
        id: ID.New("1"),
        name: "Cor",
        values: ["Preto"],
    },
    {
        id: ID.New("2"),
        name: "Marca",
        values: ["Nike", "Adidas", "Rebock"],
    },
];
