interface NoteLineModel {
    lineId: string;
    itemId: string;
    goodQuantities: number;
    badQuantities?: number;
    condition?: string;
}

export interface GoodsReceiptNoteModel {
    noteId: string;
    entryDate: string;
    lines: NoteLineModel[];
}
