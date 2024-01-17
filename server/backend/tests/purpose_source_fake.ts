import { PurposeSource, PurposeData } from "../domain/purpose";

export class FakePurposeSource implements PurposeSource {
    list(): Promise<PurposeData[]> {
        return Promise.resolve([]);
    }
}
