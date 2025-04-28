import { Context } from "elysia";
import { FolderService } from "../services/folder.service";
import { responseError, responseErrorValidate, responseSuccess } from "../utils/helpers";
import { createFolderSchema, updateFolderNameSchema } from "../validations/folder.validation";
import { FolderRepository } from "../repositories/folder.repository";

export class FolderController {

    static async getAllParentFolders({ set }: { set: Context['set'] }) {
        try {
            const { data } = await FolderService.getAllParentFolders();

            return responseSuccess(set, 200, data);
        } catch (e: unknown) {
            console.error(`Error getting folders: ${e}`);
            return responseError(set, "Internal Server Error");
        }
    }

    static async getSubFolders({ set, params }: { set: Context['set'], params: { parentId: number } }) {
        try {
            const { data } = await FolderService.getSubFolders(params.parentId);

            return responseSuccess(set, 200, data);
        } catch (e: unknown) {
            console.error(`Error getting child folders: ${e}`);
            return responseError(set, "Internal Server Error");
        }
    }

    static async createFolder({ set, body }: { set: Context['set'], body: { name: string, parentId: number | null } }) {
        try {
            const { error, value } = createFolderSchema.validate(body, { abortEarly: false });

            if (error) {
                const errorMessages = error.details.map(
                    (detail) => detail.message
                )

                return responseErrorValidate(set, 422, errorMessages[0]);
            }

            const { data } = await FolderService.createFolder(value.name, value.parentId);

            return responseSuccess(set, 201, data);
        } catch (e: unknown) {
            console.error(`Error creating folder: ${e}`);
            return responseError(set, "Internal Server Error");
        }
    }

    static async updateFolderName({ set, body }: { set: Context['set'], body: { name: string, id: number } }) {
        try {
            const { error, value } = updateFolderNameSchema.validate(body, { abortEarly: false });

            if (error) {
                const errorMessages = error.details.map(
                    (detail) => detail.message
                )

                return responseErrorValidate(set, 422, errorMessages[0]);
            }

            const { data } = await FolderService.updateFolderName(value.name, value.id);

            return responseSuccess(set, 200, data);
        } catch (e: unknown) {
            console.error(`Error updating folder name: ${e}`);
            return responseError(set, "Internal Server Error");
        }
    }

    static async deleteFolder({ set, params }: { set: Context['set'], params: { id: number } }) {
        try {
            const childs = await FolderRepository.getSubFolders(params.id);
            if (childs.length > 0) {
                return responseErrorValidate(set, 409, 'Delete folder failed');
            }

            const { data } = await FolderService.deleteFolder(params.id);

            return responseSuccess(set, 200, data);
        } catch (e: unknown) {
            console.error(`Error getting child folders: ${e}`);
            return responseError(set, "Internal Server Error");
        }
    }
}