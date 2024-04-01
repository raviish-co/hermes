import { Variation } from "../../domain/catalog/variations/variation";
import { InmemVariationRepository } from "../../persistense/inmem/inmem_variation_repository";
import { ID } from "../../shared/id";

export class VariationRepositoryStub extends InmemVariationRepository {
    constructor() {
        super(_variationsData.map((v) => new Variation(v.id, v.name, v.values)));
    }
}

const _variationsData = [
    {
        id: ID.fromString("1"),
        name: "Cor",
        values: ["Preto", "Branco", "Vermelho", "Castanho", "Azul", "Verde", "Amarelo"],
    },
    {
        id: ID.fromString("2"),
        name: "Marca",
        values: ["Nike", "Adidas", "Rebock", "Gucci", "Puma", "Fila", "Polo"],
    },
    {
        id: ID.fromString("3"),
        name: "Espessura",
        values: ["Fino", "Grosso"],
    },
    {
        id: ID.fromString("4"),
        name: "Material",
        values: ["Algodão", "Poliester", "Seda"],
    },
    {
        id: ID.fromString("5"),
        name: "Tamanho",
        values: ["S", "M", "L", "XL"],
    },
];
