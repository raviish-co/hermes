import { PurposeData } from "../domain/purposes/purpose_data";
import { Purposes } from "../domain/requests/purposes";

export class PurposeSourceStub implements Purposes {
    #purposes: PurposeData[];

    constructor() {
        this.#purposes = [
            {
                description: "Lavandaria",
                detailsConstraint: ["Interna", "Externa"],
            },
            {
                description: "Arranjo",
            },
        ];
    }

    all(): Promise<PurposeData[]> {
        return Promise.resolve(this.#purposes);
    }

    exists(name: string): Promise<boolean> {
        return Promise.resolve(this.#purposes.some((p) => p.description === name));
    }
}
