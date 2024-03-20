export class MissingDependency extends Error {
    constructor(name: string) {
        super(`Missing dependency: ${name}`);
    }
}
