import { IResponseError } from "./IResponseError";

export interface IResponse<DataType> {
    data?: DataType;
    errors?: IResponseError[];
}
