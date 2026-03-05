import crypto from "crypto";

export interface HashGeneratorData {
    noteDate: string; // YYYY-MM-DD
    issuedAt: string; // YYYY-MM-DDTHH:mm:ss
    noteId: string;
    totalValue: number;
    previousHash?: string;
}

export interface IHashGenerator {
    generateHash(data: HashGeneratorData): Promise<string>;
}

export class HashGenerator implements IHashGenerator {
    readonly #privateKey: string;

    constructor(privateKey: string) {
        if (!privateKey) {
            throw new Error("A privateKey é obrigatória para o HashGenerator.");
        }

        this.#privateKey = privateKey;
    }

    async generateHash(data: HashGeneratorData): Promise<string> {
        const { noteDate, issuedAt, noteId, totalValue, previousHash } = data;

        const sequence = this.#buildSequence(noteDate, issuedAt, noteId, totalValue, previousHash);

        const sign = crypto.createSign("RSA-SHA1").update(sequence);

        const hash = sign.sign(this.#privateKey, "base64");

        return hash;
    }

    #buildSequence(
        noteDate: string,
        issuedAt: string,
        noteId: string,
        totalValue: number,
        previousHash?: string
    ): string {
        let sequence = `${noteDate};${issuedAt};${noteId};${totalValue}`;

        if (previousHash) {
            sequence += `;${previousHash}`;
        }

        return sequence;
    }
}
