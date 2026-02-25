import { HashGeneratorData, IHashGenerator } from "../../adapters/hash_generator";

export class HashGeneratorStub implements IHashGenerator {
    async generateHash(data: HashGeneratorData): Promise<string> {
        return `${data.noteDate};${data.issuedAt};${data.noteId};${data.totalValue}`;
    }
}
