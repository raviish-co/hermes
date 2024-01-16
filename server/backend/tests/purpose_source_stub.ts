import { PurposeSource, Purpose } from "../domain/purpose";

export class PurposeSourceStub implements PurposeSource {
    #purposes: Purpose[];

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

    list(): Promise<Purpose[]> {
        return Promise.resolve(this.#purposes);
    }
}
