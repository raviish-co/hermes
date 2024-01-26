import { Article } from "../domain/articles/article";

interface ArticleDTO {
    id: string;
    name: string;
    price: number;
    isUnique: boolean;
    securityDeposit: number;
}

export function makeArticlesDTO(articles: Article[]): ArticleDTO[] {
    return articles.map((a) => ({
        id: a.articleId.toString(),
        name: a.title,
        price: Number(a.price.value.replace(",", ".")),
        isUnique: a.isUnique(),
        securityDeposit: Number(a.getSecurityDeposit().value.replace(",", ".")),
    }));
}
