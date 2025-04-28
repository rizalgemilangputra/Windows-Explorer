import Joi from "joi";

export const storeFileSchema = Joi.object({
    folderId: Joi.number().required(),
    file: Joi.required(),
});