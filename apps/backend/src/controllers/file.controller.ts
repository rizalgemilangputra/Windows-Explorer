import { Context, t } from "elysia";
import { FileService } from "../services/file.service";
import { responseError, responseErrorValidate, responseSuccess } from "../utils/helpers";
import { storeFileSchema } from "../validations/file.validation";

export class FileController {
    static async getFilesByFolderId({ set, params }: { set: Context['set'], params: { folderId: number } }) {
        try {
            const { data } = await FileService.getFilesByFolderId(params.folderId);

            return responseSuccess(set, 200, data);
        } catch (e: unknown) {
            console.error(`Error getting child folders: ${e}`);
            return responseError(set, "Internal Server Error");
        }
    }

    static async storeFile({ set, body }: { set: Context['set'], body: { folderId: number, file: File } }) {
        try {
            const { error, value } = storeFileSchema.validate(body, { abortEarly: false });

            if (error) {
                const errorMessages = error.details.map(
                    (detail) => detail.message
                )

                return responseErrorValidate(set, 422, errorMessages[0]);
            }

            const { data } = await FileService.storeFile(body.folderId, body.file);

            return responseSuccess(set, 201, data);
        } catch (e: unknown) {
            console.error(`Error store file: ${e}`);
            return responseError(set, "Internal Server Error");
        }
    }
}