import Joi from "joi";

export const createFolderSchema = Joi.object({
    name: Joi.string().required(),
    parentId: Joi.number().allow(null).optional(),
});

export const updateFolderNameSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
});