export type ArticleData = {
    articleId: string;
    quantity: number;
};

export type RequestArticlesData = {
    purposeName: string;
    articlesData: ArticleData[];
    requestTotal: string;
    returnDate: string;
};
