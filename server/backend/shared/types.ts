type PurposeData = {
    name: string;
    section?: string;
    recipient?: string;
};

export type ArticleData = {
    articleId: string;
    quantity: number;
};

export type RequestArticlesData = {
    purposeData: PurposeData;
    articlesData: ArticleData[];
    requestTotal: string;
    returnDate: string;
};
