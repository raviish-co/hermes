import { FileNotSupported } from "../backend/domain/readers/file_not_supported_error";
import { InvalidFileHeader } from "../backend/domain/readers/invalid_file_header_error";
import { FileEmpty } from "../backend/domain/readers/file_empty_error";
import { HttpStatus } from "../backend/shared/http_status";
import { makeServices } from "../backend/main";

const { importService } = makeServices();

export default defineEventHandler(async (event) => {
    const formData = await readFormData(event);

    const file = formData.get("file") as File;

    const resultOrError = await importService.uploadItems(file);

    if (resultOrError.value instanceof InvalidFileHeader) {
        return createError({
            statusCode: HttpStatus.BadRequest,
            message: resultOrError.value.message,
        });
    }

    if (resultOrError.value instanceof FileEmpty) {
        return createError({
            statusCode: HttpStatus.BadRequest,
            message: resultOrError.value.message,
        });
    }

    if (resultOrError.value instanceof FileNotSupported) {
        return createError({
            statusCode: HttpStatus.BadRequest,
            message: resultOrError.value.message,
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return {
        message: "Artigos importados com sucesso!",
    };
});
