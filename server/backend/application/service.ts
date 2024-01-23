import { PurposeSource, PurposeData, PurposeNotFound } from "../domain/purpose";
import { RequestedArticles } from "../domain/requests/requested_articles";
import { RequestedItem } from "../domain/requests/requested_item";
import { User } from "../domain/user";
import { Either, left, right } from "../shared/either";
import { ArticleNotFound } from "../domain/articles/article_not_found_error";
import { InvalidTotal } from "../domain/requests/invalid_total_error";
import { ArticleRepository } from "../domain/articles/article_repository";
import { RequestRepository } from "../domain/requests/request_repository";
import { ID } from "../shared/id";

type NewRequestArticlesError = PurposeNotFound | ArticleNotFound | InvalidTotal;

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
        purposeName: string,
        ids: string[],
        requestTotal: string
    ): Promise<Either<NewRequestArticlesError, void>> {
        const purposeOrError = await this.purposeSource.find(purposeName);
        if (purposeOrError.isLeft()) return left(purposeOrError.value);

        let idx: ID[] = [];
        for (const i of ids) {
            idx.push(ID.New(i));
        }

        const articlesOrError = await this.articleRepository.getAll(idx);
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
            returnDate: "2021-10-10T00:00:00.000Z",
            user: user,
        });

        const requestLines: RequestedItem[] = [];
        articles.forEach((article) => {
            const requestLine = RequestedItem.create({
                article,
                quantity: 1,
            });
            requestLines.push(requestLine);
        });

        requestArticles.addRequestedItems(requestLines);

        if (!requestArticles.isSameTotal(requestTotal)) {
            return left(new InvalidTotal());
        }

        await this.requestArticlesRepository.save(requestArticles);

        return right(undefined);
    }
}
