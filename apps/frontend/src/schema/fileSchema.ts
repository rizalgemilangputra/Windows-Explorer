import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const formStoreFileSchema = toTypedSchema(z.object({
    file: z
        .any()
}));