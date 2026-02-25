export type NoteOptions = {
    noteId: string;
    purpose: {
        description: string;
        notes: string;
        details?: string;
    };
    returnDate: Date;
    issuedAt: Date;
    status: string;
    userId: string;
    total: number;
    securityDeposit: number;
    lines: LineOptions[];
    hash?: string;
    previousHash?: string;
};

export type LineOptions = {
    lineId: string;
    productId: string;
    name: string;
    price: number;
    goodQuantities: number;
    badQuantities: number;
    goodQuantitiesReturned: number;
    badQuantitiesReturned: number;
    variations?: string;
    comments?: string;
};
