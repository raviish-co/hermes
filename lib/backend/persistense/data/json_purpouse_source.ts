import { Purposes, PurposeModel } from "../../domain/requests/purposes";
import { purposes } from "./purposes.json";

export class JsonPurposeSource implements Purposes {
    all(): Promise<PurposeModel[]> {
        return Promise.resolve(purposes);
    }

    exists(description: string): Promise<boolean> {
        return Promise.resolve(
            purposes.some((purpose: PurposeModel) => purpose.description === description)
        );
    }
}
