import { FileEmpty } from "../backend/domain/readers/file_empty_error";
import { FileNotSupported } from "../backend/domain/readers/file_not_supported_error";
import { InvalidFileHeader } from "../backend/domain/readers/invalid_file_header_error";
import { makeServices } from "../backend/main";

const { importService } = makeServices();

export enum HttpStatusCode {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError = 500,
}

export default defineEventHandler(async (event) => {
    const formData = await readFormData(event);

    const categoryName = formData.get("category") as string;
    const subcategoryName = formData.get("subcategory") as string;
    const department = formData.get("department") as string;
    const file = formData.get("file") as File;

    const resultOrError = await importService.uploadItems({
        categoryName,
        subcategoryName,
        department,
        file,
    });

    if (resultOrError.value instanceof InvalidFileHeader) {
        throw createError({
            statusCode: HttpStatusCode.BadRequest,
            statusMessage: resultOrError.value.message,
        });
    }

    if (resultOrError.value instanceof FileEmpty) {
        throw createError({
            statusCode: HttpStatusCode.BadRequest,
            statusMessage: resultOrError.value.message,
        });
    }

    if (resultOrError.value instanceof FileNotSupported) {
        throw createError({
            statusCode: HttpStatusCode.BadRequest,
            statusMessage: resultOrError.value.message,
        });
    }

    setResponseStatus(event, HttpStatusCode.Created);

    return {
        message: "Items uploaded successfully",
    };
});
