import { PurposeSource, Purpose } from "../domain/purpose";

export class Service {
    readonly purposeSource: PurposeSource;

    constructor(purposeSource: PurposeSource) {
        this.purposeSource = purposeSource;
    }

    async listPurposes(): Promise<Purpose[]> {
        const purposes = await this.purposeSource.list();
        return Promise.resolve(purposes);
    }
}
