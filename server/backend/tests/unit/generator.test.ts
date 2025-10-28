import { InmemSequenceStorage } from "../../persistence/inmem/inmem_sequence_storage";
import { SequenceGenerator } from "../../adapters/sequences/sequence_generator";
import { describe, expect, it } from "vitest";

describe("Test ID generation", () => {
    it("Deve gerar um ID com o seguinte formato **HRC-1000**", async () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage, 1000);

        const result = await generator.generate("HRC");

        expect(result).toBe("HRC-1000");
    });

    it("Deve armazenar o ID gerado no banco de dados", async () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage, 1000);

        await generator.generate("HRC");

        const number = storage.get("HRC");

        expect(storage.records.length).toEqual(1);
        expect(number).toEqual(1000);
    });

    it("Deve gerar um novo ID incrementando o ID anteriormente registado", async () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage, 1000);

        await generator.generate("HRC");

        const result = await generator.generate("HRC");

        expect(result).toBe("HRC-1001");
    });

    it("Deve receber um prefixo para gerar o ID", async () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage, 1000);

        const result = await generator.generate("TRC");

        expect(result).toBe("TRC-1000");
    });

    it("Deve receber o valor inical para contagem", async () => {
        const initial = 2000;
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage, initial);

        const result = await generator.generate("TRC");

        expect(result).toBe("TRC-2000");
    });

    it("Deve ser 1 o valor inicial caso não seja atribuido o valor inicial", async () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);

        const result = await generator.generate("TRC");

        expect(result).toBe("TRC-0001");
    });

    it("Deve gerar 3 IDs e todos devem ser únicos", async () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);

        const result1 = await generator.generate("TRC");
        const result2 = await generator.generate("TRC");
        const result3 = await generator.generate("TRC");

        expect(result1).toEqual("TRC-0001");
        expect(result2).toEqual("TRC-0002");
        expect(result3).toEqual("TRC-0003");
    });

    it("Deve gerar IDs com códigos diferentes", async () => {
        const storage = new InmemSequenceStorage();
        const generator1 = new SequenceGenerator(storage);
        const generator2 = new SequenceGenerator(storage, 10);

        const result1 = await generator1.generate("TRC");
        const result2 = await generator2.generate("HRS");

        expect(result1).toEqual("TRC-0001");
        expect(result2).toEqual("HRS-0010");
    });
});
