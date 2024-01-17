export class User {
    readonly name: string;

    private constructor(name: string) {
        this.name = name;
    }

    static create(name: string): User {
        const user = new User(name);
        return user;
    }
}
