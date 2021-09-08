import { IResponseError } from "../types/IResponseError";

export const getError = <T extends string>(name: T, errors: IResponseError[]): string | undefined => {
    return errors.filter(error => error.param === name)[ 0 ]?.msg;
};