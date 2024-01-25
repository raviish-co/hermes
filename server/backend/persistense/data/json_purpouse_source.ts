import { PurposeData } from "../../domain/purposes/purpose_data";
import { PurposeSource } from "../../domain/purposes/purpose_source";
import { purposes } from "./purposes.json";

export class JsonPurposeSource implements PurposeSource {
    list(): Promise<PurposeData[]> {
        return Promise.resolve(purposes);
    }

    exists(name: string): Promise<boolean> {
        return Promise.resolve(purposes.some((purpose: PurposeData) => purpose.name === name));
    }
}
