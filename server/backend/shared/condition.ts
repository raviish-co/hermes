enum Status {
    Good = "Bom",
    Bad = "Mau",
}

export class Condition {
    readonly status: Status;
    readonly comment?: string;

    constructor(comment?: string) {
        this.status = Status.Good;

        if (!comment) return;

        this.status = Status.Bad;
        this.comment = comment;
    }
}
