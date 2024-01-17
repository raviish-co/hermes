import { PurposeSource, PurposeData } from "../domain/purpose";

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
}
