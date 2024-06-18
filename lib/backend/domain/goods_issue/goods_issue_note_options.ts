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
    total: number;
    securityDeposit: number;
    securityDepositWithheld: number;
    lines: LineOptions[];
};

type LineOptions = {
    lineId: string;
    itemId: string;
    name: string;
    price: number;
    goodQuantities: number;
    badQuantities: number;
    goodQuantitiesReturned: number;
    badQuantitiesReturned: number;
    variations?: Record<string, string>;
    comments?: string;
};
