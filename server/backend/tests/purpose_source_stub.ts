import { PurposeData } from "../domain/purposes/purpose_data";
import { PurposeSource } from "../domain/purposes/purpose_source";

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

    exists(name: string): Promise<boolean> {
        return Promise.resolve(this.#purposes.some((p) => p.name === name));
    }
}
