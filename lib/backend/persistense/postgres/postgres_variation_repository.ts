import type { PrismaClient } from "@prisma/client";
import type { Variation } from "../../domain/catalog/variations/variation";
import type { VariationNotFound } from "../../domain/catalog/variations/variation_not_found_error";
import type { VariationRepository } from "../../domain/catalog/variations/variation_repository";
import type { Either } from "../../shared/either";
import type { ID } from "../../shared/id";

export class PostgresVariationRepository implements VariationRepository {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.#prisma = prisma;
    }

    findByNames(names: string[]): Promise<Either<VariationNotFound, Variation[]>> {
        throw new Error("Method not implemented.");
    }

    vertifyIds(variationsIds: ID[]): Promise<Either<VariationNotFound, void>> {
        throw new Error("Method not implemented.");
    }

    verifyValues(values: string[]): Promise<Either<VariationNotFound, void>> {
        throw new Error("Method not implemented.");
    }

    async save(variation: Variation): Promise<void> {
        await this.#prisma.variation.create({
            data: {
                variation_id: variation.variationId.toString(),
                name: variation.name,
            },
        });
    }

    getAll(): Promise<Variation[]> {
        throw new Error("Method not implemented.");
    }
}
