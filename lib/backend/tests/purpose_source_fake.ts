import { PurposeData } from "../domain/purposes/purpose_data";
import { Purposes } from "../domain/requests/purposes";

export class FakePurposeSource implements Purposes {
    all(): Promise<PurposeData[]> {
        return Promise.resolve([]);
    }

    exists(name: string): Promise<boolean> {
        return Promise.resolve(false);
    }
}
