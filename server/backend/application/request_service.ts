import { Purpose } from "../domain/purposes/purpose";
import { PurposeData } from "../domain/purposes/purpose_data";
import { PurposeSource } from "../domain/purposes/purpose_source";
import { PurposeNotFound } from "../domain/purposes/purpose_not_found_error";
import { RequestedArticles } from "../domain/requests/requested_articles";
import { RequestedItem } from "../domain/requests/requested_item";
import { User } from "../domain/user";
import { Either, left, right } from "../shared/either";
import { InvalidTotal } from "../domain/requests/invalid_total_error";
import { ArticleRepository } from "../domain/articles/article_repository";
import { ID } from "../shared/id";
import { Article } from "../domain/articles/article";
import { InsufficientStock } from "../domain/articles/insufficient_stock_error";
import { RequestRepository } from "../domain/requests/request_repository";
import { ArticleData, RequestArticlesData } from "../shared/types";
import { NewRequestArticlesError } from "../shared/errors";

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
        const { purposeData, articlesData, requestTotal, returnDate } = data;

        const purposeExists = await this.purposeSource.exists(purposeData.name);
        if (!purposeExists) return left(new PurposeNotFound(purposeData.name));

        const identifiers = this.#buildArticlesIdentifiers(articlesData);

        const articlesOrError = await this.articleRepository.getAll(identifiers);
        if (articlesOrError.isLeft()) return left(articlesOrError.value);

        const purpose = Purpose.fromOptions(purposeData);
        const articles = articlesOrError.value;
        const user = User.create("Teste");
        const requestArticles = RequestedArticles.create({
            purpose,
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

    #buildArticlesIdentifiers(articles: ArticleData[]): ID[] {
        const identifiers: ID[] = [];
        for (const article of articles) {
            identifiers.push(ID.New(article.articleId));
        }
        return identifiers;
    }

    #buildRequestedItems(
        articles: Article[],
        articlesData: ArticleData[]
    ): Either<InsufficientStock, RequestedItem[]> {
        const requestedItems: RequestedItem[] = [];

        for (const i in articles) {
            const { quantity } = articlesData[i];
            const article = articles[i];

            if (article.verifyStock(quantity)) {
                const message = `Stock insufficient for article ${article.title}`;
                return left(new InsufficientStock(message));
            }

            article.decreaseStock(quantity);
            const requestedItem = RequestedItem.create({ article, quantity });
            requestedItems.push(requestedItem);
        }
        return right(requestedItems);
    }
}
