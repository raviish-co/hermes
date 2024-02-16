type Options = {
    name: string;
    department?: string;
};

export class Section {
    readonly name: string;
    readonly department?: string;

    private constructor(name: string, department?: string) {
        this.name = name;
        this.department = department;
    }

    static create(options: Options) {
        const { name, department } = options;

        const section = new Section(name, department);

        return section;
    }
}
