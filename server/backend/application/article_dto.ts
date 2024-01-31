import { Product } from "../domain/catalog/product";

interface ArticleDTO {
    id: string;
    name: string;
    price: string;
    isUnique: boolean;
    securityDeposit: string;
}

export function makeArticlesDTO(articles: Product[]): ArticleDTO[] {
    return articles.map((a) => ({
        id: a.productId.toString(),
        name: a.name,
        price: a.price.value,
        isUnique: a.isUnique(),
        securityDeposit: a.getSecurityDeposit().value,
    }));
}
