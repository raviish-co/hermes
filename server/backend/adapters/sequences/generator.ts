export interface Generator {
    generate(code: string): Promise<string>;
}
