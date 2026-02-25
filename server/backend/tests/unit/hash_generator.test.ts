import { HashGenerator, HashGeneratorData } from "../../adapters/hash_generator";
import { describe, expect, it } from "vitest";
import crypto from "crypto";

describe("HashGenerator", () => {
    describe("Constructor", () => {
        it("Deve criar uma instância com uma chave privada válida", async () => {
            const { privateKey } = await getKeys();
            const generator = new HashGenerator(privateKey);
            expect(generator).toBeDefined();
        });

        it("Deve lançar erro quando a chave privada é vazia", () => {
            expect(() => new HashGenerator("")).toThrow(
                "A privateKey é obrigatória para o HashGenerator.",
            );
        });

        it("Deve lançar erro quando a chave privada é null", () => {
            expect(() => new HashGenerator(null as any)).toThrow(
                "A privateKey é obrigatória para o HashGenerator.",
            );
        });

        it("Deve lançar erro quando a chave privada é undefined", () => {
            expect(() => new HashGenerator(undefined as any)).toThrow(
                "A privateKey é obrigatória para o HashGenerator.",
            );
        });
    });

    describe("generateHash", () => {
        it("Deve gerar um hash válido com todos os parâmetros obrigatórios", async () => {
            const { privateKey } = await getKeys();
            const generator = new HashGenerator(privateKey);
            const data: HashGeneratorData = {
                noteDate: "2026-02-20",
                issuedAt: "2026-02-20T10:30:00",
                noteId: "HRC-1000",
                totalValue: 1500.5,
            };

            const hash = await generator.generateHash(data);

            expect(hash).toBeDefined();
            expect(typeof hash).toBe("string");
            expect(hash.length).toBeGreaterThan(0);
        });

        it("Deve gerar um hash que pode ser verificado com a chave pública", async () => {
            const { privateKey, publicKey } = await getKeys();
            const generator = new HashGenerator(privateKey);
            const data: HashGeneratorData = {
                noteDate: "2026-02-20",
                issuedAt: "2026-02-20T10:30:00",
                noteId: "HRC-1000",
                totalValue: 1500.5,
            };

            const hash = await generator.generateHash(data);
            const sequence = `${data.noteDate};${data.issuedAt};${data.noteId};${data.totalValue}`;

            const verify = crypto.createVerify("RSA-SHA1");
            verify.update(sequence);

            const isValid = verify.verify(publicKey, Buffer.from(hash, "base64"));

            expect(isValid).toBe(true);
        });

        it("Deve incluir o hash anterior na sequência quando fornecido", async () => {
            const { privateKey } = await getKeys();
            const generator = new HashGenerator(privateKey);
            const previousHash = "previousHash123";
            const data: HashGeneratorData = {
                noteDate: "2026-02-20",
                issuedAt: "2026-02-20T10:30:00",
                noteId: "HRC-1001",
                totalValue: 2000.0,
                previousHash,
            };

            const hash = await generator.generateHash(data);

            expect(hash).toBeDefined();
            expect(typeof hash).toBe("string");
        });

        it("Deve gerar hashes diferentes para dados diferentes", async () => {
            const { privateKey } = await getKeys();
            const generator = new HashGenerator(privateKey);

            const data1: HashGeneratorData = {
                noteDate: "2026-02-20",
                issuedAt: "2026-02-20T10:30:00",
                noteId: "HRC-1000",
                totalValue: 1500.5,
            };

            const data2: HashGeneratorData = {
                noteDate: "2026-02-20",
                issuedAt: "2026-02-20T10:30:00",
                noteId: "HRC-1001",
                totalValue: 1500.5,
            };

            const hash1 = await generator.generateHash(data1);
            const hash2 = await generator.generateHash(data2);

            expect(hash1).not.toEqual(hash2);
        });

        it("Deve gerar o mesmo hash para os mesmos dados", async () => {
            const { privateKey } = await getKeys();
            const generator = new HashGenerator(privateKey);

            const data: HashGeneratorData = {
                noteDate: "2026-02-20",
                issuedAt: "2026-02-20T10:30:00",
                noteId: "HRC-1000",
                totalValue: 1500.5,
            };

            const hash1 = await generator.generateHash(data);
            const hash2 = await generator.generateHash(data);

            expect(hash1).toEqual(hash2);
        });

        it("Deve gerar hash válido com noteId contendo caracteres especiais", async () => {
            const { privateKey } = await getKeys();
            const generator = new HashGenerator(privateKey);
            const data: HashGeneratorData = {
                noteDate: "2026-02-20",
                issuedAt: "2026-02-20T10:30:00",
                noteId: "HRC-1000-ABC",
                totalValue: 1500.5,
            };

            const hash = await generator.generateHash(data);

            expect(hash).toBeDefined();
            expect(typeof hash).toBe("string");
        });

        it("Deve gerar hash com formato de data ISO para issuedAt", async () => {
            const { privateKey } = await getKeys();
            const generator = new HashGenerator(privateKey);
            const data: HashGeneratorData = {
                noteDate: "2026-02-20",
                issuedAt: "2026-02-20T23:59:59",
                noteId: "HRC-1000",
                totalValue: 1500.5,
            };

            const hash = await generator.generateHash(data);

            expect(hash).toBeDefined();
            expect(typeof hash).toBe("string");
        });

        it("Deve gerar hash diferente quando previousHash é alterado", async () => {
            const { privateKey } = await getKeys();
            const generator = new HashGenerator(privateKey);

            const data1: HashGeneratorData = {
                noteDate: "2026-02-20",
                issuedAt: "2026-02-20T10:30:00",
                noteId: "HRC-1001",
                totalValue: 2000.0,
                previousHash: "hash1",
            };

            const data2: HashGeneratorData = {
                noteDate: "2026-02-20",
                issuedAt: "2026-02-20T10:30:00",
                noteId: "HRC-1001",
                totalValue: 2000.0,
                previousHash: "hash2",
            };

            const hash1 = await generator.generateHash(data1);
            const hash2 = await generator.generateHash(data2);

            expect(hash1).not.toEqual(hash2);
        });
    });
});

async function getKeys() {
    const { privateKey: priv, publicKey: pub } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
    });

    const privateKey = priv.export({ format: "pem", type: "pkcs8" }) as string;
    const publicKey = pub.export({ format: "pem", type: "spki" }) as string;

    return { privateKey, publicKey };
}
