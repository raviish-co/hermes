import { PurposeSource, Purpose } from "../domain/purpose";

export class FakePurposeSource implements PurposeSource {
    list(): Promise<Purpose[]> {
        return Promise.resolve([]);
    }
}
