import { IChatMate } from "../../types/IChatMate";
import { IPromiseState } from "../../types/IPromiseState";
import { IUser } from "../../types/IUser";
import { IUserOnlineStatus } from "../../types/IUserOnlineStatus";

export interface IAuthState {
    user: IUser | null;
    authToken: string;
    login: IPromiseState;
    register: IPromiseState;
    chatMates: IChatMate[];
}
