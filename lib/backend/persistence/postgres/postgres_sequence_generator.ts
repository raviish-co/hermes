import type { PrismaClient, Sequence } from "~/generated/primsa";
import type { Generator } from "../../adapters/sequences/generator";

export class PostgresSequenceGenerator implements Generator {
    #prisma: PrismaClient;
    #initial: number;

    constructor(prisma: PrismaClient, initial: number = 1) {
        this.#prisma = prisma;
        this.#initial = initial;
    }

    async generate(code: string): Promise<string> {
        const sequenceData = await this.#prisma.sequence.findUnique({ where: { name: code } });
        if (!sequenceData) {
            await this.#prisma.sequence.create({ data: { name: code, value: this.#initial } });
            return this.#formatSequence(code, this.#initial);
        }

        const value = this.#nextValue(sequenceData);

        await this.#prisma.sequence.update({ where: { name: code }, data: { value } });

        return this.#formatSequence(code, value);
    }

    #nextValue(sequence: Sequence) {
        return sequence.value + 1;
    }

    #formatSequence(code: string, value: number): string {
        return `${code} - ${value.toString().padStart(4, "0")}`;
    }
}
