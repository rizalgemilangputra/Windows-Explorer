import { Context } from "elysia";

export const responseSuccess = (set: Context['set'], code: number, data: any) => {
    set.status = code;
    return {
        data,
    };
}

export const responseError = (set: Context['set'], message: string) => {
    set.status = 500;
    return {
        error: message,
    };
}

export const responseErrorValidate = (set: Context['set'], code: number, errorMessages: any) => {
    set.status = code;
    return {
        error: errorMessages,
    };
}