import { PurposeSource, PurposeData, PurposeNotFound } from "../domain/purpose";
import { RequestedArticles } from "../domain/requests/requested_articles";
import { RequestedItem } from "../domain/requests/requested_item";
import { User } from "../domain/user";
import { Either, left, right } from "../shared/either";
import { ArticleNotFound } from "../domain/articles/article_not_found_error";
import { InvalidTotal } from "../domain/requests/invalid_total_error";
import { ArticleRepository } from "../domain/articles/article_repository";
import { ID } from "../shared/id";
import { Article } from "../domain/articles/article";
import { StockInsufficient } from "../domain/articles/stock_insufficient";
import { RequestRepository } from "../domain/requests/request_repository";
import { Pagination } from "../shared/pagination";

type NewRequestArticlesError = PurposeNotFound | ArticleNotFound | InvalidTotal;

type ArticleData = {
    articleId: string;
    quantity: number;
};

type RequestArticlesData = {
    purposeName: string;
    articlesData: ArticleData[];
    requestTotal: string;
    returnDate: string;
};

export class RequestService {
    readonly purposeSource: PurposeSource;
    readonly articleRepository: ArticleRepository;
    readonly requestArticlesRepository: RequestRepository;

    constructor(
        purposeSource: PurposeSource,
        articleRepository: ArticleRepository,
        requestArticlesRepository: RequestRepository
    ) {
        this.purposeSource = purposeSource;
        this.articleRepository = articleRepository;
        this.requestArticlesRepository = requestArticlesRepository;
    }

    async listPurposes(): Promise<PurposeData[]> {
        const purposes = await this.purposeSource.list();
        return Promise.resolve(purposes);
    }

    async requestArticles(
        data: RequestArticlesData
    ): Promise<Either<NewRequestArticlesError, void>> {
        const { purposeName, articlesData, requestTotal, returnDate } = data;
        const purposeOrError = await this.purposeSource.find(purposeName);
        if (purposeOrError.isLeft()) return left(purposeOrError.value);

        const identifiers = this.#buildArticlesIdentifiers(articlesData);
        const articlesOrError = await this.articleRepository.getAll(identifiers);
        if (articlesOrError.isLeft()) return left(articlesOrError.value);

        const articles = articlesOrError.value;
        const purpose = purposeOrError.value;
        const user = User.create("Teste");
        const requestArticles = RequestedArticles.create({
            purposeOptions: {
                name: purpose.name,
                section: purpose.sections?.at(0),
                recipient: "",
            },
            user,
            returnDate,
        });

        const requestedItemsOrError = this.#buildRequestedItems(articles, articlesData);
        if (requestedItemsOrError.isLeft()) return left(requestedItemsOrError.value);

        requestArticles.addRequestedItems(requestedItemsOrError.value);
        if (!requestArticles.isSameTotal(requestTotal)) return left(new InvalidTotal());

        await this.requestArticlesRepository.save(requestArticles);

        await this.articleRepository.updateStock(articles);

        return right(undefined);
    }

    listArticles(pageToken: number = 1, perPage?: number): Promise<Pagination<Article>> {
        return this.articleRepository.list(pageToken, perPage);
    }

    searchArticles(query: string): Promise<Article[]> {
        return this.articleRepository.search(query);
    }

    #buildArticlesIdentifiers(articlesData: ArticleData[]): ID[] {
        const identifiers: ID[] = [];
        for (const articleData of articlesData) {
            identifiers.push(ID.New(articleData.articleId));
        }
        return identifiers;
    }

    #buildRequestedItems(
        articles: Article[],
        articlesData: ArticleData[]
    ): Either<StockInsufficient, RequestedItem[]> {
        const requestedItems: RequestedItem[] = [];

        for (const i in articles) {
            const { quantity } = articlesData[i];
            const article = articles[i];

            if (article.verifyStock(quantity)) {
                const message = `Stock insufficient for article ${article.title}`;
                return left(new StockInsufficient(message));
            }

            article.decreaseStock(quantity);
            const requestedItem = RequestedItem.create({ article, quantity });
            requestedItems.push(requestedItem);
        }
        return right(requestedItems);
    }
}
