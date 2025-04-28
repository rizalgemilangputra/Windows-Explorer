import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const formCreateFolderSchema = toTypedSchema(z.object({
    name: z.string().min(1, 'Nama Folder harus diisi.'),
}));