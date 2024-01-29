import { Article } from "../domain/articles/article";

interface ArticleDTO {
    id: string;
    name: string;
    price: string;
    isUnique: boolean;
    securityDeposit: string;
}

export function makeArticlesDTO(articles: Article[]): ArticleDTO[] {
    return articles.map((a) => ({
        id: a.articleId.toString(),
        name: a.title,
        price: a.price.value,
        isUnique: a.isUnique(),
        securityDeposit: a.getSecurityDeposit().value,
    }));
}
