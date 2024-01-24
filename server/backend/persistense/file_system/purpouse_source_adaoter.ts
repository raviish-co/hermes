import { PurposeData, PurposeNotFound, PurposeSource } from "~/server/backend/domain/purpose";
import { Either, left, right } from "../../shared/either";
import { purposes } from "../file_system/purposes.json";

export class PurposeSourceAdapter implements PurposeSource {
    list(): Promise<PurposeData[]> {
        return Promise.resolve(purposes);
    }

    find(name: string): Promise<Either<PurposeNotFound, PurposeData>> {
        const purpose = (purposes as PurposeData[]).find((p) => p.name === name);

        if (!purpose) {
            return Promise.resolve(left(new PurposeNotFound(name)));
        }

        return Promise.resolve(right(purpose));
    }
}
