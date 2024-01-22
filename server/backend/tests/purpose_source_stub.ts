import { PurposeSource, PurposeData, PurposeNotFound } from "../domain/purpose";
import { Either, left, right } from "../shared/either";

export class PurposeSourceStub implements PurposeSource {
    #purposes: PurposeData[];

    constructor() {
        this.#purposes = [
            {
                name: "Lavandaria",
                sections: ["Interna", "Externa"],
            },
            {
                name: "Arranjo",
            },
        ];
    }

    list(): Promise<PurposeData[]> {
        return Promise.resolve(this.#purposes);
    }

    find(name: string): Promise<Either<PurposeNotFound, PurposeData>> {
        const purpose = this.#purposes.find((p) => p.name === name);
        if (!purpose) return Promise.resolve(left(new PurposeNotFound(name)));
        return Promise.resolve(right(purpose));
    }
}
