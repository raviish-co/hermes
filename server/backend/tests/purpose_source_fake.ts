import { PurposeSource, PurposeData, PurposeNotFound } from "../domain/purpose";
import { Either, right } from "../shared/either";

export class FakePurposeSource implements PurposeSource {
    list(): Promise<PurposeData[]> {
        return Promise.resolve([]);
    }

    find(name: string): Promise<Either<PurposeNotFound, PurposeData>> {
        return Promise.resolve(right({ name: "Aluguer" }));
    }
}
