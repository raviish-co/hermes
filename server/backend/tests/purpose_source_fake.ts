import { PurposeData } from "../domain/purposes/purpose_data";
import { PurposeSource } from "../domain/purposes/purpose_source";

export class FakePurposeSource implements PurposeSource {
    list(): Promise<PurposeData[]> {
        return Promise.resolve([]);
    }

    exists(name: string): Promise<boolean> {
        return Promise.resolve(false);
    }
}
