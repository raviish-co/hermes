import { describe, expect, it } from "vitest";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import { SequenceGenerator } from "../../domain/sequence_generator";

describe("Test ID generation", () => {
    it("Deve gerar um ID com o seguinte formato **HRC - 1000**", () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage, 1000);

        const result = generator.generate("HRC");

        expect(result).toBe("HRC - 1000");
    });

    it("Deve armazenar o ID gerado no banco de dados", () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage, 1000);

        generator.generate("HRC");

        const number = storage.get("HRC");

        expect(storage.records.length).toEqual(1);
        expect(number).toEqual(1000);
    });

    it("Deve gerar um novo ID incrementando o ID anteriormente registrado", () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage, 1000);

        generator.generate("HRC");

        const result = generator.generate("HRC");

        expect(result).toBe("HRC - 1001");
    });

    it("Deve receber um prefixo para gerar o ID", () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage, 1000);

        const result = generator.generate("TRC");

        expect(result).toBe("TRC - 1000");
    });

    it("Deve receber o valor inical para contagem", () => {
        const initial = 2000;
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage, initial);

        const result = generator.generate("TRC");

        expect(result).toBe("TRC - 2000");
    });

    it("Deve ser 1 o valor inicial caso não seja atribuido o valor inicial", () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);

        const result = generator.generate("TRC");

        expect(result).toBe("TRC - 0001");
    });

    it("Deve gerar 3 IDs e todos devem ser únicos", () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);

        const result1 = generator.generate("TRC");
        const result2 = generator.generate("TRC");
        const result3 = generator.generate("TRC");

        expect(result1).toEqual("TRC - 0001");
        expect(result2).toEqual("TRC - 0002");
        expect(result3).toEqual("TRC - 0003");
    });

    it("Deve gerar IDs com códigos diferentes", () => {
        const storage = new InmemSequenceStorage();
        const generator1 = new SequenceGenerator(storage);
        const generator2 = new SequenceGenerator(storage, 10);

        const result1 = generator1.generate("TRC");
        const result2 = generator2.generate("HRS");

        expect(result1).toEqual("TRC - 0001");
        expect(result2).toEqual("HRS - 0010");
    });
});
