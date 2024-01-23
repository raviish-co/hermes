export class ArticleNotFound extends Error {
    constructor(articleId: string) {
        super(`Article ${articleId} not found`);
    }
}
