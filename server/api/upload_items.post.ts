import { FileNotSupported } from "../backend/domain/readers/file_not_supported_error";
import { InvalidFileHeader } from "../backend/domain/readers/invalid_file_header_error";
import { FileEmpty } from "../backend/domain/readers/file_empty_error";
import { HttpStatus } from "../backend/shared/http_status";
import { makeServices } from "../backend/main";

const { importService } = makeServices();

export default defineEventHandler(async (event) => {
    const formData = await readFormData(event);

    const categoryName = formData.get("category") as string;
    const subcategoryName = formData.get("subcategory") as string;
    const department = formData.get("departament") as string;
    const file = formData.get("file") as File;

    const resultOrError = await importService.uploadItems({
        categoryName,
        subcategoryName,
        department,
        file,
    });

    if (resultOrError.value instanceof InvalidFileHeader) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: resultOrError.value.message,
        });
    }

    if (resultOrError.value instanceof FileEmpty) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: resultOrError.value.message,
        });
    }

    if (resultOrError.value instanceof FileNotSupported) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: resultOrError.value.message,
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return {
        message: "Items uploaded successfully",
    };
});
