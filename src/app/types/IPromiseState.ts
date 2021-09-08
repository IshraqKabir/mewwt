import { IResponseError } from "./IResponseError";

export interface IPromiseState {
    state: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    errors: IResponseError[];
}
