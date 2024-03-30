export class SectionNotFound extends Error {
    constructor(name: string) {
        super(`Section ${name} not found`);
    }
}
