import { PurposeSource, PurposeData, PurposeNotFound } from "../domain/purpose";
import { RequestArticles } from "../domain/request_articles";
import { RequestLine } from "../domain/request_line";
import { User } from "../domain/user";
import { Either, left, right } from "../shared/either";
import {
    ArticleNotFound,
    ArticleRepository,
    ID,
    RequestArticlesRepository,
} from "../tests/integration/service.test";

type NewRequestArticleError = PurposeNotFound | ArticleNotFound;

export class Service {
    readonly purposeSource: PurposeSource;
    readonly articleRepository: ArticleRepository;
    readonly requestArticlesRepository: RequestArticlesRepository;

    constructor(
        purposeSource: PurposeSource,
        articleRepository: ArticleRepository,
        requestArticlesRepository: RequestArticlesRepository
    ) {
        this.purposeSource = purposeSource;
        this.articleRepository = articleRepository;
        this.requestArticlesRepository = requestArticlesRepository;
    }

    async listPurposes(): Promise<PurposeData[]> {
        const purposes = await this.purposeSource.list();
        return Promise.resolve(purposes);
    }

    async newRequestArticles(
        purposeName: string,
        ids: string[]
    ): Promise<Either<NewRequestArticleError, void>> {
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
        const requestArticles = RequestArticles.create({
            purposeOptions: {
                name: purpose.name,
                section: purpose.sections?.at(0),
                recipient: "",
            },
            returnDate: "2021-10-10T00:00:00.000Z",
            total: "1000",
            user: user,
        });

        const requestLines: RequestLine[] = [];
        articles.forEach((article) => {
            const requestLine = RequestLine.create({
                article,
                quantity: 1,
            });
            requestLines.push(requestLine);
        });

        requestArticles.addRequestLines(requestLines);

        console.log(requestArticles.total.value);

        await this.requestArticlesRepository.save(requestArticles);

        return right(undefined);
    }
}
