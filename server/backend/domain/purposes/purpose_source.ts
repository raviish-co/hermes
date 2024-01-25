import { PurposeData } from "./purpose_data";

export interface PurposeSource {
    list(): Promise<PurposeData[]>;
    exists(name: string): Promise<boolean>;
}
