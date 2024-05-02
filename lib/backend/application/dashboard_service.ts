import type { GoodsIssueNoteRepository } from "../domain/goods_issue/goods_issue_note_repository";

export class DashboardService {
    #goodsIssueNoteRepository: GoodsIssueNoteRepository;

    constructor(repository: GoodsIssueNoteRepository) {
        this.#goodsIssueNoteRepository = repository;
    }

    async totalExpiredGoodsIssueNotes(): Promise<number> {
        const notes = await this.#goodsIssueNoteRepository.getAll();

        if (notes.length === 0) return 0;

        const expiredNotes = notes.filter((note) => note.isExpired());

        return expiredNotes.length;
    }
}
