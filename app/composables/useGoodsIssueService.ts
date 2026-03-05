import { useGoodsIssueRepository } from "@app/composables/useGoodsIssueRepository";
import { useItemRepository } from "@app/composables/useItemRepository";
import { useItemStockRepository } from "@app/composables/useItemStockRepository";
import { usePurposeSpec } from "@app/composables/usePurposeSpec";
import { useSequenceGenerator } from "@app/composables/useSequenceGenerator";
import { GoodsIssueService } from "@backend/application/goods_issue_service";
import { HashGenerator } from "@backend/adapters/hash_generator";
import { JsPdfGenerator } from "@backend/adapters/pdf/js_pdf_generator";
import { HashGeneratorStub } from "@backend/tests/stubs/hash_generator_stub";

const hashGenerator =
    process.env.NODE_ENV === "development"
        ? new HashGeneratorStub()
        : new HashGenerator(process.env.CERTIFICATE_PRIVATE_KEY as string);

const pdfGenerator = new JsPdfGenerator();

const srv = new GoodsIssueService(
    useItemRepository(),
    useItemStockRepository(),
    useGoodsIssueRepository(),
    useSequenceGenerator(),
    usePurposeSpec(),
    hashGenerator,
    pdfGenerator,
);

export const useGoodsIssueService = () => srv;
