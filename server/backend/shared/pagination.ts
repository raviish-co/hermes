export type Pagination<T> = {
    result: T[];
    perPage: number;
    pageToken: number;
    total: number;
};

export type PaginatorOptions = {
    pageToken: number;
    perPage: number;
};
